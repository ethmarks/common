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
  const entries = await readdir(inDir, { withFileTypes: true });

  for (const entry of entries) {
    const inPath = join(inDir, entry.name);
    const outPath = join(outDir, entry.name);

    if (entry.isDirectory()) {
      await mkdir(outPath, { recursive: true });
      await processAllSCSS(inPath, outPath);
    } else if (entry.isFile() && entry.name.endsWith(".scss")) {
      await processSingleSCSS(inPath, outPath.replace(".scss", ".css"));
    }
  }
}

export async function scssPipeline(inDir, outDir) {
  await mkdir(outDir, { recursive: true });
  await processAllSCSS(inDir, outDir);
}
