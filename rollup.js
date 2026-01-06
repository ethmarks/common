import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import * as fs from "fs/promises";
import * as path from "path";
import { getOutPath } from "./build.js";

export default async function bundle({
  inFile,
  outFile = "",
  format,
  name = "",
}) {
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
    file: outFile || getOutPath(inFile),
    format: format,
    name: name,
  });

  await bundle.close();
}
