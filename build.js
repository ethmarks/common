import { scssPipeline } from "./scss.js";
import { sveltePipeline } from "./svelte.js";

const OUT_DIR = "dist/";

const SCSS_DIR = "scss/";
await scssPipeline(SCSS_DIR, OUT_DIR);

const SVELTE_DIR = "svelte/";
await sveltePipeline(SVELTE_DIR, OUT_DIR);
