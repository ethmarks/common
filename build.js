import { scssPipeline } from "./scss.js";

const OUT_DIR = "dist/";

const SCSS_DIR = "scss/";
await scssPipeline(SCSS_DIR, OUT_DIR);
