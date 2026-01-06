import * as fs from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";

export const OUT_DIR = "dist/";
fs.mkdir(OUT_DIR, { recursive: true });

export function getOutPath(inFile) {
  const pathParts = inFile.split(path.sep);
  pathParts[0] = OUT_DIR;
  return pathParts.join(path.sep);
}

async function copyOut(inFile) {
  await fs.copyFile(inFile, getOutPath(inFile));
}

// ============================================================================
// Web Components
// ============================================================================
//
// This section bundles the .wc.js source into .js dist

import { bundle } from "./rollup.js";

await bundle("wc/eth.wc.js", "ethComponents");

await processSCSS("scss/props");

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
// Misc
// ============================================================================
//
// This section handles one-off miscellaneous assets

await copyOut("misc/favicon.ico");

// ============================================================================
// Hardpoint Verification
// ============================================================================
//
// This section verifies that all Hardpoint assets are present in the final
// output, and fails if any are not present

import assert from "assert";

function hardpoint(inPath) {
  assert(
    existsSync(
      path.join(OUT_DIR, inPath),
      `Hardpoint asset "${inPath}" not present in output`,
    ),
  );
}

hardpoint("eth.wc.js");

hardpoint("props.css");

hardpoint("Fira_Code.woff2");
hardpoint("Kenia.woff2");
hardpoint("Nunito-cyrillic.woff2");
hardpoint("Nunito-cyrillic-italic.woff2");
hardpoint("Nunito-latin.woff2");
hardpoint("Nunito-latin-ext.woff2");
hardpoint("Nunito-latin-ext-italic.woff2");
hardpoint("Nunito-latin-italic.woff2");
hardpoint("Sen-latin.woff2");
hardpoint("Sen-latin-ext.woff2");

hardpoint("favicon.ico");
