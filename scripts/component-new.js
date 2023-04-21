const readline = require("readline");
const fs = require("fs-extra");
const { kebabCaseToPascalCase } = require("./helpers/strings");
const {
  componentTemplate,
  styleTemplate,
  typesTemplate,
  testTemplate,
} = require("./templates/components.template.js");

const PATH_COMPONENT = "./src/components";

const TEMPLATE_MAPPER = [
  [".component.tsx", componentTemplate],
  [".styles.scss", styleTemplate],
  [".types.ts", typesTemplate],
  [".test.tsx", testTemplate],
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  const componentName = process.argv[2];
  if (componentName) return finalQuestion(componentName);
  return initialQuestion();
}

async function question(text) {
  return new Promise((resolve) => rl.question(text, resolve));
}

async function initialQuestion() {
  const text = "Qual o nome do componente? \nexemplos: button-icon, card, forms/text-field\n";
  return question(text).then((pathName) => {
    if (pathName) return finalQuestion(pathName);
    console.log("O component precisa ter um nome");
    console.log("O processo foi cancelado");
    process.exit(0);
  });
}

async function finalQuestion(pathName) {
  const snakeName = pathName.replace(/.*\//, "");
  const componentName = kebabCaseToPascalCase(pathName);
  const components = TEMPLATE_MAPPER.reduce(
    (acc, [ext]) => (acc += ` - ${componentName}/${snakeName}${ext}\n`),
    ""
  );
  const text = `\nOs seguintes arquivos serão criados: \n\n${components}\n\n Confirmar a criação? [*/N]\n`;
  return question(text).then((letter) => {
    if (letter === "N") {
      console.log("O processo foi cancelado");
      return process.exit(0);
    }
    createNewComponent(pathName);
    console.log(`o componente ${pathName} foi criado com sucesso`);
    require("./component-index");
    return process.exit(0);
  });
}

function createNewComponent(pathName) {
  const snakeName = pathName.replace(/.*\//, "");
  const name = kebabCaseToPascalCase(snakeName);
  const groupPath = pathName.replace(snakeName, "");
  const dir = `${PATH_COMPONENT}/${groupPath}${name}`;
  fs.ensureDirSync(dir);
  for (const [ext, fn] of TEMPLATE_MAPPER) {
    const dest = `${dir}/${snakeName}${ext}`;
    const content = fn(name, snakeName);
    fs.writeFileSync(dest, content);
    console.log(`Done: create ${dest}`);
  }
}

main();
