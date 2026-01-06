import bundle from "./rollup.js";
import * as path from "path";
import { OUT_DIR, getOutPath } from "./build.js";

export default async function processSvelte(inFile, outName = "") {
  const outFile =
    path.join(OUT_DIR, outName + ".sv.js") ||
    getOutPath(inFile).replace(/\.svelte$/, ".sv.js");
  await bundle({
    inFile: inFile,
    outFile: outFile,
    format: "esm",
    useSvelte: true,
  });
}
