import * as sass from "sass";
import { writeFile, mkdir, readdir } from "fs/promises";
import { join } from "path";

async function processSingleSCSS(inFile, outFile) {
  const result = await sass.compileAsync(inFile, {
    style: "compressed",
  });
  await writeFile(outFile, result.css);
}

async function processAllSCSS(inDir, outDir) {
  const files = await readdir(inDir);
  await Promise.all(
    files.map((file) =>
      processSingleSCSS(
        join(inDir, file),
        join(outDir, file.replace(".scss", ".css")),
      ),
    ),
  );
}

export async function scssPipeline(inDir, outDir) {
  await mkdir("dist", { recursive: true });

  await processAllSCSS(inDir, outDir);
}
