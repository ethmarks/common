import bundle from "./rollup.js";
import { getOutPath } from "./build.js";

export default async function processSvelte(inFile) {
  await bundle({
    inFile: inFile,
    outFile: getOutPath(inFile).replace(/\.svelte$/, ".js"),
    format: "esm",
    useSvelte: true,
  });
}
