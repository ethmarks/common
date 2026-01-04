import * as svelte from "svelte/compiler";
import * as fs from "fs/promises";
import * as path from "path";
import * as esbuild from "esbuild";

async function bundleSvelte(source, outDir, filename, outExt) {
  const tempPath = path.join(outDir, `${filename}.temp.js`);
  await fs.writeFile(tempPath, source);
  await esbuild.build({
    entryPoints: [tempPath],
    bundle: true,
    format: "iife",
    outfile: path.join(outDir, `${filename}${outExt}`),
    platform: "browser",
    minify: true,
  });
  await fs.unlink(tempPath);
}

async function processSvelteWC(inFile, outDir, wcPrefix = "eth") {
  const source = await fs.readFile(inFile, "utf-8");
  const filename = path.basename(inFile, ".svelte");

  // Add <svelte:options customElement="x-{filename}" /> if not present
  let wcSource = source;
  if (!source.includes("<svelte:options")) {
    wcSource = `<svelte:options customElement="${wcPrefix}-${filename}" />\n\n${source}`;
  }

  const wcResult = svelte.compile(wcSource, {
    filename: inFile,
    generate: "dom",
    css: "injected",
  });

  await bundleSvelte(wcResult.js.code, outDir, filename, ".wc.js");
}

async function processSvelteMJS(inFile, outDir) {
  const source = await fs.readFile(inFile, "utf-8");
  const filename = path.basename(inFile, ".svelte");

  // Remove <svelte:options customElement="..." /> if present
  let mjsSource = source.replace(
    /<svelte:options\s+customElement="[^"]*"\s*\/>\s*/g,
    "",
  );

  const mjsResult = svelte.compile(mjsSource, {
    filename: inFile,
    generate: "dom",
    css: "injected",
  });

  await fs.writeFile(path.join(outDir, `${filename}.mjs`), mjsResult.js.code);
}

async function processAllSvelte(inDir, outDir) {
  const entries = await fs.readdir(inDir, { withFileTypes: true });

  for (const entry of entries) {
    const inPath = path.join(inDir, entry.name);

    if (entry.isDirectory()) {
      const outPath = path.join(outDir, entry.name);
      await fs.mkdir(outPath, { recursive: true });
      await processAllSvelte(inPath, outPath);
    } else if (entry.isFile() && entry.name.endsWith(".svelte")) {
      await processSvelteWC(inPath, outDir);
      await processSvelteMJS(inPath, outDir);
    }
  }
}

export async function sveltePipeline(inDir, outDir) {
  await fs.mkdir(outDir, { recursive: true });
  await processAllSvelte(inDir, outDir);
}
