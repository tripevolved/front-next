const path = require("path");
const { getFiles, saveFile } = require("./helpers/files");

const BLACK_LIST = ["/home"];
const DATA_FOLDER = "data/pages";
const DATA_DIR = path.join(__dirname, "../src", DATA_FOLDER);
const STATIC_PATHS_FILE = path.join(DATA_DIR, "index.ts");

function main() {
  const files = getFiles(DATA_DIR);
  const jsonFiles = getOnlyJsonFiles(files);
  const indexContent = getIndexContent(jsonFiles);
  saveFile(STATIC_PATHS_FILE, indexContent);
}

function getOnlyJsonFiles(files = []) {
  let result = [];
  for (const file of files) {
    if (!/\.json$/.test(file)) continue;
    const path = file.replace(DATA_DIR, "").replace(".json", "");
    if (BLACK_LIST.includes(path)) continue;
    result.push(path);
  }
  return result;
}

function getIndexContent(files = []) {
  const content = files.map((file) => `"${file}"`).join(", ");
  return `export const staticJsonPaths = [ ${content} ];\n`;
}

main();
