import { mkdir, writeFile } from "node:fs/promises";

// `tsc --emitDeclarationOnly` doesn't generate runtime JS.
// Provide tiny ESM stubs so accidental value-imports don't crash.
await mkdir(new URL("../dist/", import.meta.url), { recursive: true });

await writeFile(
  new URL("../dist/index.js", import.meta.url),
  "export {};\n",
  "utf8",
);
