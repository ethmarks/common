import * as fs from "fs";

export const OUT_DIR = "dist/";
fs.mkdirSync(OUT_DIR, { recursive: true });

// ============================================================================
// SCSS
// ============================================================================

// This section processes SCSS source into CSS stylesheets

import { processSCSS } from "./scss.js";

await processSCSS("scss/props");

// ============================================================================
// Hardpoint Verification
// ============================================================================

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
