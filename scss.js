import * as sass from "sass";
import * as fs from "fs/promises";
import * as path from "path";
import { OUT_DIR } from "./build.js";

export async function processSCSS(inFile) {
  if (!path.extname(inFile)) {
    inFile += ".scss";
  }

  const pathParts = inFile.split(path.sep);
  pathParts[0] = OUT_DIR;
  const outFile = pathParts.join(path.sep).replace(/\.scss$/, ".css");

  const result = await sass.compileAsync(inFile, {
    style: "compressed",
  });

  await fs.writeFile(outFile, result.css);
}
