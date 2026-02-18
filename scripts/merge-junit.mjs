import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import chalk from 'chalk';

const scriptsDir = fileURLToPath(new URL('.', import.meta.url));
const rootDir = path.resolve(scriptsDir, '..');
const mergedPath = path.join(rootDir, 'reports', 'junit.xml');

const SEARCH_ROOTS = [path.join(rootDir, 'apps'), path.join(rootDir, 'packages')];

async function* walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.turbo' || entry.name === 'dist') continue;
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,
  suppressEmptyNode: true,
});

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function num(value) {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

let files = [];
for (const root of SEARCH_ROOTS) {
  for await (const fullPath of walk(root)) {
    if (fullPath.endsWith(`${path.sep}reports${path.sep}junit.xml`)) {
      files.push(fullPath);
    }
  }
}

if (files.length === 0) {
  console.log('[test] No JUnit XML files found to merge');
  process.exit(0);
}

const mergedSuites = [];
let totals = { tests: 0, failures: 0, errors: 0, skipped: 0, time: 0 };
const perFile = [];

for (const fullPath of files) {
  const xml = await fs.readFile(fullPath, 'utf8');
  const doc = parser.parse(xml);
  const file = path.relative(rootDir, fullPath).replaceAll(path.sep, '/');

  // Extract project name from the path (e.g., 'apps/api/reports/junit.xml' -> 'api')
  const projectName = file.split('/')[1];

  // Supports both <testsuites><testsuite/></testsuites> and single <testsuite/>
  const testsuites = doc.testsuites;
  const topSuite = doc.testsuite;

  if (testsuites) {
    const suites = toArray(testsuites.testsuite);
    for (const suite of suites) mergedSuites.push(suite);

    const failures = num(testsuites['@_failures']);
    const outputColor = failures === 0 ? chalk.green : chalk.red;

    perFile.push({
      file: projectName,
      suites: suites.length,
      tests: num(testsuites['@_tests']),
      failures,
      errors: num(testsuites['@_errors']),
      skipped: num(testsuites['@_skipped']),
      time: num(testsuites['@_time']),
      outputColor,
    });

    totals.tests += num(testsuites['@_tests']);
    totals.failures += failures;
    totals.errors += num(testsuites['@_errors']);
    totals.skipped += num(testsuites['@_skipped']);
    totals.time += num(testsuites['@_time']);
  } else if (topSuite) {
    mergedSuites.push(topSuite);

    const failures = num(topSuite['@_failures']);
    const outputColor = failures === 0 ? chalk.green : chalk.red;

    perFile.push({
      file: projectName,
      suites: 1,
      tests: num(topSuite['@_tests']),
      failures,
      errors: num(topSuite['@_errors']),
      skipped: num(topSuite['@_skipped']),
      time: num(topSuite['@_time']),
      outputColor,
    });

    totals.tests += num(topSuite['@_tests']);
    totals.failures += failures;
    totals.errors += num(topSuite['@_errors']);
    totals.skipped += num(topSuite['@_skipped']);
    totals.time += num(topSuite['@_time']);
  }
}

const merged = {
  testsuites: {
    '@_name': 'pnpm test',
    '@_tests': String(totals.tests),
    '@_failures': String(totals.failures),
    '@_errors': String(totals.errors),
    '@_skipped': String(totals.skipped),
    '@_time': String(totals.time),
    testsuite: mergedSuites,
  },
};

await fs.mkdir(path.dirname(mergedPath), { recursive: true });
await fs.writeFile(mergedPath, builder.build(merged), 'utf8');

console.log(`[test] Merged JUnit written: ${path.relative(rootDir, mergedPath)} (${files.length} files)`);
console.log(
  `[test] Summary: ${totals.tests} tests, ${totals.failures} failures, ${totals.errors} errors, ${totals.skipped} skipped (${totals.time}s)`
);
console.log('[test] Inputs:');
for (const entry of perFile) {
  console.log(
    entry.outputColor(
      `  - [${entry.file}] ${entry.tests} tests, ${entry.failures} failures, ${entry.errors} errors (${entry.time}s)`
    )
  );
}
