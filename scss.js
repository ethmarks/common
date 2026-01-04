import * as sass from "sass";
import { writeFile, mkdir } from "fs/promises";

export async function main() {
  await mkdir("dist", { recursive: true });

  const result = await sass.compileAsync("scss/example.scss", {
    style: "compressed",
  });

  await writeFile("dist/example.css", result.css);
}
