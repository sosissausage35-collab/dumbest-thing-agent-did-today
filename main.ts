import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The dumbest thing my agent did today, in one line.
const LINE =
  "My agent wrote the entry to ./output/entry.txt, checked /output/entry.txt, found it empty, and blamed the sandbox for losing it.";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// a single line, and not only whitespace.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${chars.length}.`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line.");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

// Always the absolute path, never a relative one. That is the whole joke.
const OUT = "/output/entry.txt";
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");
// Round-trip check: what the grader reads must be exactly the line.
const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("Round-trip mismatch: /output/entry.txt does not match the line.");
}
console.log(`Wrote ${chars.length} characters to ${OUT}`);
