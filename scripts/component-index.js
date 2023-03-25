const warningDontChangeFile = `/**
 * Do NOT change this file, because it is automatically generated
 * run "yarn component:index" to update
 */\n`;

const { camelCaseToKebabCase } = require("./helpers/strings");
const { getFiles, saveFile } = require("./helpers/files");

const COMPONENTS_FOLDER = "./src/components";
const INTERNAL_COMPONENTS_FOLDER = `${COMPONENTS_FOLDER}/internal`;
const GENERAL_COMPONENTS_FOLDER = `${COMPONENTS_FOLDER}/general`;

function main() {
  console.log("Start: index");

  const groups = getGroupByFolder(COMPONENTS_FOLDER);
  indexStyles(groups);
  indexComponents(groups);

  indexByFolder(INTERNAL_COMPONENTS_FOLDER, "internal");
  indexByFolder(GENERAL_COMPONENTS_FOLDER, "general");

  console.log("Success");
  process.exit(0);
}

function indexByFolder(folder = "", name = "") {
  console.log(`  > [Gen] index componnents group: ${name}`);
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
      if (/(test|spec|helpers?|utils?)\.tsx?$/.test(file)) continue;
      if (!/.tsx?$/.test(file)) continue;
      const fileName = file.replace(/\.tsx?/, "");
      result += `export * from "./${fileName}";\n`;
    }

    save(`${path}/index.ts`, result);
    console.log(`     - ${componentName}`);
  }
}

function indexStyles(groups = []) {
  console.log("  > [Gen] index styles");

  let result = "";

  for (const { path, styles } of groups) {
    if (styles.length === 0) continue;

    for (const style of styles) {
      result += `@import ".${path.replace("src/", "")}/${style}";\n`;
    }
  }

  save("./src/styles/components.scss", result);
}

function indexRoot(groups = [], dir = "") {
  let result = "";
  for (const { path, files } of groups) {
    if (files.length === 0) continue;
    result += `export * from ".${path.replace(dir, "")}";\n`;
  }
  save(`${dir}/index.ts`, result);
}

function save(dest, content) {
  const warnningContent = `${warningDontChangeFile}${content}`;
  saveFile(dest, warnningContent);
}

main();
