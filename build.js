import * as fs from "fs/promises";

export const OUT_DIR = "dist/";
await fs.mkdir(OUT_DIR, { recursive: true });

// ============================================================================
// SCSS
// ============================================================================

import { processSCSS } from "./scss.js";

await processSCSS("scss/props");
