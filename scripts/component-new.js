const { join } = require("path");
const { askQuestion } = require("./helpers/question");
const { createDir, getFiles, saveFile } = require("./helpers/files");
const { kebabCaseToPascalCase } = require("./helpers/strings");
const {
  componentTemplate,
  styleTemplate,
  typesTemplate,
  testTemplate,
} = require("./templates/components.template.js");

const PATH_UI = "./src/ui/components";
const PATH_FEATURES = "./src/features";

const TEMPLATE_MAPPER = [
  [".component.tsx", componentTemplate],
  [".styles.scss", styleTemplate],
  [".types.ts", typesTemplate],
  [".test.tsx", testTemplate],
];

async function main() {
  const location = await askProjectLocation();

  const folder = await askPathLocation(location);
  const path = join(location, folder);

  const componentSnakeName = await askComponentName();

  createNewComponent(path, componentSnakeName);

  reIndex();

  process.exit();
}

async function askProjectLocation() {
  const q = "Seu component deve ficar dentro de:";
  const options = ["ui/components", "features"];
  const { response } = await askQuestion(q, options);
  if (response === "1") return PATH_UI;
  if (response === "2") return PATH_FEATURES;
}

async function askPathLocation(location) {
  const options = getFiles(location).reduce((acc, fileName) => {
    const regex = new RegExp(`${location}/(.*?)/.*`);
    const path = fileName.replace(regex, "$1");
    if (acc.includes(path) || /index/.test(path)) return acc;
    return [...acc, path];
  }, []);
  const q = "Em qual diretório o seu componente deve ficar?";
  const { response, option } = await askQuestion(q, ["* Quero criar um novo", ...options]);
  if (response !== "1") return option;
  return (await askQuestion("Informe qual é o nome do novo diretório")).response;
}

async function askComponentName() {
  const q = [
    "Qual o nome do componente?",
    "Escreva no formato snake-case: button-icon, card, text-field",
  ].join("\n");
  return (await askQuestion(q)).response;
}

function reIndex() {
  require("./component-index");
}

function createNewComponent(path, snakeName) {
  const pascalName = kebabCaseToPascalCase(snakeName);
  const dir = join(path, pascalName);

  createDir(dir);
  for (const [ext, fn] of TEMPLATE_MAPPER) {
    const dest = `${dir}/${snakeName}${ext}`;
    const content = fn(pascalName, snakeName);
    saveFile(dest, content);
    console.log(`Done: create ${dest}`);
  }
  console.log("Component criado com sucesso!");
}

main();
