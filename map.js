import * as fs from "fs/promises";
import * as path from "path";

const DIST_DIR = "dist/";
const OUTPUT_FILE = path.join(DIST_DIR, "index.html");

async function generateMap() {
  // Read all files in the dist directory
  const files = await fs.readdir(DIST_DIR);

  // Filter out the index.html itself and sort the files
  const assets = files.filter((file) => file !== "index.html").sort();

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ethmarks/common</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@intergrav/dev.css@4" />
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <h1>ethmarks/common</h1>
  <p>Asset library for <a href="https://github.com/ethmarks">ethmarks</a></p>
  <p>View the source at <a href="https://github.com/ethmarks/common">ethmarks/common</a> on GitHub</p>
  <p><strong>Total Assets:</strong> ${assets.length} files</p>
  <ul>
${assets.map((file) => `    <li><a href="${file}">${file}</a></li>`).join("\n")}
  </ul>
</body>
</html>
`;

  // Write the index.html file
  await fs.writeFile(OUTPUT_FILE, html, "utf-8");
  console.log(`✔️ Generated index.html with ${assets.length} assets`);
}

export default generateMap;
