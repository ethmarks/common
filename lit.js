import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { readdir } from "fs/promises";
import { join } from "path";

async function bundleLitComponent(inFile, outFile) {
  const bundle = await rollup({
    input: inFile,
    plugins: [resolve(), terser()],
    onwarn(warning, warn) {
      // Suppress node-resolve warnings about unused exports
      if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
      if (warning.plugin === "node-resolve") return;
      warn(warning);
    },
  });

  await bundle.write({
    file: outFile,
    format: "iife",
    name: "LitComponent",
  });

  await bundle.close();
}

async function processAllLit(inDir, outDir) {
  const entries = await readdir(inDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".js")) {
      const inPath = join(inDir, entry.name);
      const outPath = join(outDir, entry.name.replace(".js", ".wc.js"));
      await bundleLitComponent(inPath, outPath);
    }
  }
}

export async function litPipeline(inDir, outDir) {
  await processAllLit(inDir, outDir);
}
