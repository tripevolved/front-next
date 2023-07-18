const warningDontChangeFile = `/**
 * Automatically generated
 * run "yarn component:index" to update
 */\n`;

const { camelCaseToKebabCase } = require("./helpers/strings");
const { getFiles, saveFile } = require("./helpers/files");

const COMPONENTS_FOLDER = "./src/ui/components";
const FEATURES_FOLDER = "./src/features";

const INDEX_FOLDERS = [COMPONENTS_FOLDER, FEATURES_FOLDER];

function main() {
  console.log("Start: index");

  for (const folderGroup of INDEX_FOLDERS) {
    const groups = getGroupByFolder(folderGroup);
    indexStyles(groups, folderGroup);
    indexComponents(groups);

    indexByFolder(folderGroup, "Generator");
  }

  console.log("Success");
  process.exit(0);
}

function indexByFolder(folder = "", name = "") {
  console.log(`  > [Gen] index components group: ${name}`);
  const group = getGroupByFolder(folder);
  indexRoot(group, folder);
}

function getGroupByFolder(folder = "") {
  const filesList = getFiles(folder);
  return groupByComponentName(filesList);
}

function groupByComponentName(filesList = []) {
  const groups = [];

  for (const file of filesList) {
    if (/.*\/index.ts$/.test(file)) continue;
    const componentName = file.replace(/^(.*)\/(.*)\/.*$/, "$2");

    let groupIndex = groups.findIndex((a) => a.componentName === componentName);

    if (groupIndex === -1) {
      const path = file.replace(new RegExp(`(.*${componentName}).*`), "$1");
      groups.push({
        componentName,
        name: camelCaseToKebabCase(componentName),
        path,
        files: [],
        styles: [],
      });
      groupIndex = groups.length - 1;
    }

    const group = groups[groupIndex];
    const fileName = file.replace(/.*\//, "");

    if (/styles.scss$/.test(fileName)) {
      group.styles.push(fileName);
    } else {
      group.files.push(fileName);
    }
  }

  return groups;
}

function indexComponents(groups = []) {
  console.log("  > [Gen] index components");
  for (const { path, files, componentName } of groups) {
    let result = "";

    for (const file of files) {
      if (!/(types?|components?)\.tsx?$/.test(file)) continue;
      const fileName = file.replace(/\.tsx?/, "");
      result += `export * from "./${fileName}";\n`;
    }

    save(`${path}/index.ts`, result);
    console.log(`     - ${componentName}`);
  }
}

function indexStyles(groups = [], folderGroup) {
  console.log("  > [Gen] index styles");

  let result = "";

  for (const { path, styles } of groups) {
    if (styles.length === 0) continue;

    for (const style of styles) {
      const relative = path.replace(folderGroup, "");
      result += `@import ".${relative}/${style}";\n`;
    }
  }

  save(`${folderGroup}/index.scss`, result);
}

function indexRoot(groups = [], dir = "") {
  console.log(dir);
  let result = "";
  for (const { path, files } of groups) {
    if (files.length === 0) continue;
    const relative = path.replace(dir, "");
    if (!relative) continue;
    result += `export * from ".${relative}";\n`;
  }
  save(`${dir}/index.ts`, result);
}

function save(dest, content) {
  const warningContent = `${warningDontChangeFile}${content}`;
  saveFile(dest, warningContent);
}

main();
