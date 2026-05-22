import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "client/public/assets");
const srcDir = path.join(root, "client/src");
const serverDir = path.join(root, "server/src");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const assetFiles = walk(assetsDir).map((file) => path.relative(assetsDir, file).replace(/\\/g, "/"));
const sourceText = [...walk(srcDir), ...walk(serverDir)]
  .filter((file) => file.endsWith(".js") || file.endsWith(".jsx"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const missing = assetFiles.filter((asset) => !sourceText.includes(asset));

console.log(`Assets in folder: ${assetFiles.length}`);
console.log(`Referenced in code: ${assetFiles.length - missing.length}`);
if (missing.length) {
  console.log("Not referenced:");
  missing.forEach((file) => console.log(`  - ${file}`));
  process.exit(1);
}
console.log("All asset files are referenced in the project.");
