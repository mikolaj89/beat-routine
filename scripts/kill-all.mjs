#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run') || args.has('-n');
const force = args.has('--force');
const includePorts = args.has('--ports') || args.has('--include-ports');

const DEFAULT_PORTS = [3000, 8000, 8081];
const envPorts = process.env.MONOREPO_KILL_PORTS;
const ports = envPorts
  ? envPorts
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(n => Number.isFinite(n))
  : DEFAULT_PORTS;

const excludedComms = new Set([
  'bash',
  'zsh',
  'sh',
  'fish',
  'tmux',
  'sshd',
  'code',
  'code-insiders',
  'cursor',
]);

const allowedPortComms = new Set(['node', 'deno', 'pnpm', 'npm', 'turbo']);

const likelyDevProcess = (cmd) =>
  /(\bnode\b|\bdeno\b|\bpnpm\b|\bnpm\b|\bturbo\b|concurrently|react-native|metro|next\b|vite\b|ts-node|tsx\b|jest\b)/i.test(
    cmd
  );

async function readText(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function readLink(filePath) {
  try {
    return await fs.readlink(filePath);
  } catch {
    return null;
  }
}

async function getParentPid(pid) {
  // /proc/<pid>/stat: pid (comm) state ppid ...
  const stat = await readText(`/proc/${pid}/stat`);
  if (!stat) return null;

  // comm can contain spaces, wrapped in parentheses. Find the ")" then split the remainder.
  const end = stat.lastIndexOf(')');
  if (end === -1) return null;
  const after = stat.slice(end + 1).trim();
  const parts = after.split(/\s+/);

  // parts[0] = state, parts[1] = ppid
  const ppid = Number(parts[1]);
  return Number.isFinite(ppid) ? ppid : null;
}

async function listPids() {
  const entries = await fs.readdir('/proc', { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && /^\d+$/.test(e.name))
    .map(e => Number(e.name))
    .filter(n => Number.isFinite(n));
}

function tryKill(pid, signal) {
  try {
    process.kill(pid, signal);
    return true;
  } catch {
    return false;
  }
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function killByPorts() {
  if (!includePorts || !ports.length) return [];

  // Use `lsof` if available; it’s the safest way to target listeners.
  // If lsof is missing, we just skip this step.
  const candidates = new Set();

  const { spawnSync } = await import('node:child_process');
  const lsofCheck = spawnSync('command', ['-v', 'lsof'], { shell: true });
  if (lsofCheck.status !== 0) return [];

  for (const port of ports) {
    // Only kill LISTENers on these ports; avoids catching random client connections.
    const out = spawnSync('lsof', ['-nP', '-iTCP:' + String(port), '-sTCP:LISTEN', '-t'], {
      encoding: 'utf8',
    });
    if (out.status === 0 && out.stdout) {
      out.stdout
        .split(/\s+/)
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(pid => candidates.add(Number(pid)));
    }
  }

  return [...candidates].filter(n => Number.isFinite(n) && n > 1);
}

async function main() {
  const pids = await listPids();
  const selfPid = process.pid;

  // Exclude this process and its ancestors (pnpm, shells) so we don't kill ourselves mid-run.
  const excludedPids = new Set([selfPid]);
  let cursor = selfPid;
  for (let i = 0; i < 16; i++) {
    const parent = await getParentPid(cursor);
    if (!parent || parent <= 1) break;
    excludedPids.add(parent);
    cursor = parent;
  }

  const portPids = new Set(await killByPorts());

  /** @type {Array<{pid:number, comm:string|null, cmd:string|null, cwd:string|null, reason:string}>} */
  const targets = [];

  for (const pid of pids) {
    if (excludedPids.has(pid)) continue;

    const procDir = `/proc/${pid}`;
    const comm = (await readText(`${procDir}/comm`))?.trim() ?? null;

    const cwd = await readLink(`${procDir}/cwd`);

    // cmdline is NUL-separated
    const cmdlineRaw = await readText(`${procDir}/cmdline`);
    const cmd = cmdlineRaw ? cmdlineRaw.replace(/\0/g, ' ').trim() : null;

    // Never target the process running this script (even if called via pnpm).
    if (cmd && cmd.includes('scripts/kill-all.mjs')) continue;

    const inRepoCwd = cwd ? cwd.startsWith(repoRoot + path.sep) || cwd === repoRoot : false;
    const mentionsRepo = cmd ? cmd.includes(repoRoot) : false;

    const matchesPorts = portPids.has(pid);

    // Don’t ever kill obvious interactive shells/editors.
    if (comm && excludedComms.has(comm)) {
      // Except if it’s a port listener we explicitly want to kill.
      if (!matchesPorts) continue;
    }

    // Primary targeting logic:
    // - Optionally: if it’s listening on our known dev ports AND looks like dev tooling, include it.
    // - Otherwise: only kill processes that clearly belong to this repo and look like dev tooling.
    const looksLikeDev = cmd ? likelyDevProcess(cmd) : false;

    if (matchesPorts) {
      const okByComm = comm ? allowedPortComms.has(comm) : false;
      const okByCmd = looksLikeDev && (inRepoCwd || mentionsRepo);
      if (okByComm || okByCmd || force) {
        targets.push({ pid, comm, cmd, cwd, reason: 'port-listener' });
      }
      continue;
    }

    if ((inRepoCwd || mentionsRepo) && (looksLikeDev || force)) {
      targets.push({ pid, comm, cmd, cwd, reason: inRepoCwd ? 'cwd-in-repo' : 'cmd-mentions-repo' });
    }
  }

  if (!targets.length) {
    console.log('No monorepo processes found to kill.');
    return;
  }

  console.log(
    `${dryRun ? '[dry-run] ' : ''}Found ${targets.length} process(es) to terminate under ${repoRoot}`
  );

  for (const t of targets) {
    const label = `${t.pid} ${t.comm ?? ''}`.trim();
    const preview = t.cmd ? ` :: ${t.cmd.slice(0, 160)}` : '';
    console.log(`- ${label} (${t.reason})${preview}`);
  }

  if (dryRun) return;

  // SIGTERM first
  for (const t of targets) {
    tryKill(t.pid, 'SIGTERM');
  }

  await sleep(800);

  // SIGKILL anything that survived
  const survivors = [];
  for (const t of targets) {
    try {
      process.kill(t.pid, 0);
      survivors.push(t.pid);
    } catch {
      // already dead
    }
  }

  if (survivors.length) {
    for (const pid of survivors) {
      tryKill(pid, 'SIGKILL');
    }
  }

  console.log(`Done. Terminated ${targets.length} process(es).`);
}

main().catch(err => {
  console.error('kill-all failed:', err);
  process.exit(1);
});
