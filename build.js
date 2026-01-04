import { scssPipeline } from "./scss.js";
import { litPipeline } from "./lit.js";

const OUT_DIR = "dist/";

const SCSS_DIR = "scss/";
await scssPipeline(SCSS_DIR, OUT_DIR);

const LIT_DIR = "lit/";
await litPipeline(LIT_DIR, OUT_DIR);
