import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import * as fs from "fs/promises";
import * as path from "path";
import { getOutPath } from "./build.js";

export async function bundle(inFile, name) {
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
    file: getOutPath(inFile),
    format: "iife",
    name: name,
  });

  await bundle.close();
}
