import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = fileURLToPath(new URL('.', import.meta.url));
const rootDir = path.resolve(scriptsDir, '..');
const reportsDir = path.join(rootDir, 'reports');
const mergedPath = path.join(reportsDir, 'junit.xml');

async function rmSafe(target) {
  try {
    await fs.rm(target, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

await fs.mkdir(reportsDir, { recursive: true });
await rmSafe(mergedPath);

console.log(`[test] Reports dir ready: ${path.relative(rootDir, reportsDir)}`);
