import * as fs from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";

export const OUT_DIR = "dist/";
fs.rm(OUT_DIR, { recursive: true, force: true });
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
// This section bundles to .wc.js and renders to .wc.html

import processWC from "./wc.js";
import processStaticWC from "./wc-fallback.js";

await processWC("wc/ethmarks.wc.js");

await processStaticWC("wc/header.wc.js");
await processStaticWC(
  "wc/header.wc.js",
  { active: "home" },
  "dist/header-home.wc.html",
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "about" },
  "dist/header-about.wc.html",
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "blips" },
  "dist/header-blips.wc.html",
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "posts" },
  "dist/header-posts.wc.html",
);
await processStaticWC(
  "wc/header.wc.js",
  { active: "projects" },
  "dist/header-projects.wc.html",
);

await processStaticWC("wc/footer.wc.js");

// ============================================================================
// SCSS
// ============================================================================
//
// This section processes SCSS source into CSS stylesheets

import { processSCSS } from "./scss.js";

await processSCSS("scss/props");
await processSCSS("scss/layout");
await processSCSS("scss/text");
await processSCSS("scss/fonts");
await processSCSS("scss/media");
await processSCSS("scss/header");
await processSCSS("scss/footer");
await processSCSS("scss/blockquote");
await processSCSS("scss/table");

await processSCSS("scss/ethmarks");
await processSCSS("scss/ethmarks-props");
await processSCSS("scss/ethmarks-wc");
await processSCSS("scss/ethmarks-rich");

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

await copyOut("misc/ethmarks.ico");

await copyOut("internal/favicon.ico");

import generateMap from "./map.js";
await generateMap();

// ============================================================================
// Hardpoint Verification
// ============================================================================
//
// This section verifies that all Hardpoint assets are present in the final
// output, and fails if any are not present

import assert from "assert";

function hardpoint(inPath) {
  assert(
    existsSync(path.join(OUT_DIR, inPath)),
    `❌ Hardpoint asset "${inPath}" not present in output`,
  );
  console.log(`✔️ Hardpoint asset "${inPath}" is present in output`);
}

hardpoint("ethmarks.wc.js");
hardpoint("header.wc.html");
hardpoint("footer.wc.html");

hardpoint("ethmarks.css");
hardpoint("ethmarks-props.css");
hardpoint("ethmarks-wc.css");
hardpoint("ethmarks-rich.css");

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

hardpoint("ethmarks.ico");

console.log(`✅ All Hardpoint assets present in output`);
