import bundle from "./rollup.js";
import * as fs from "fs/promises";
import * as path from "path";
import { OUT_DIR, getOutPath } from "./build.js";

export default async function processSvelte(inFile, outName = "") {
  const outFileESM =
    path.join(OUT_DIR, outName + ".sv.js") ||
    getOutPath(inFile).replace(/\.svelte$/, ".sv.js");
  const outFileSvelte =
    path.join(OUT_DIR, outName + ".svelte") || getOutPath(inFile);
  await bundle({
    inFile: inFile,
    outFile: outFileESM,
    format: "esm",
    useSvelte: true,
  });
  await fs.copyFile(inFile, outFileSvelte);
}
