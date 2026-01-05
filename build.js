import * as fs from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";

export const OUT_DIR = "dist/";
fs.mkdir(OUT_DIR, { recursive: true });

async function copyOut(inFile) {
  const pathParts = inFile.split(path.sep);
  pathParts[0] = OUT_DIR;
  const outFile = pathParts.join(path.sep).replace(/\.scss$/, ".css");
  await fs.copyFile(inFile, outFile);
}

// ============================================================================
// SCSS
// ============================================================================
//
// This section processes SCSS source into CSS stylesheets

import { processSCSS } from "./scss.js";

await processSCSS("scss/props");

// ============================================================================
// Fonts
// ============================================================================
//
// This section copies WOFF2 files into the output

await copyOut("fonts/Fira_Code.woff2");
await copyOut("fonts/Kenia.woff2");
await copyOut("fonts/Nunito-cyrillic.woff2");
await copyOut("fonts/Nunito-cyrillic-italic.woff2");
await copyOut("fonts/Nunito-latin.woff2");
await copyOut("fonts/Nunito-latin-ext.woff2");
await copyOut("fonts/Nunito-latin-ext-italic.woff2");
await copyOut("fonts/Nunito-latin-italic.woff2");
await copyOut("fonts/Sen-latin.woff2");
await copyOut("fonts/Sen-latin-ext.woff2");

// ============================================================================
// Hardpoint Verification
// ============================================================================
//
// This section verifies that all Hardpoint assets are present in the final
// output, and fails if any are not present

import assert from "assert";

async function hardpoint(path) {
  assert(
    fs.existsSync(path),
    `Hardpoint asset "${path}" not present in output`,
  );
}

hardpoint("dist/props.css");
