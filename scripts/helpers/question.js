const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = async (q) => new Promise((resolve) => rl.question(`\n${q}`, resolve));

async function askQuestion(text = "", options = []) {
  if (options.length === 0) {
    const response = await ask(`${text}\n> `);
    if (response) return { response };
    console.log("Resposta inválida \n");
    return askQuestion();
  }
  const a = options.reduce((acc, label, index) => `${acc}\n (${index + 1}) ${label}`, "");
  const q = `${text}${a}\nDigite o número: > `;
  const response = await ask(q);
  const index = Number(response) - 1;
  const option = Number.isNaN(index) ? null : options[index];
  if (option) return { response, option };
  console.log("Resposta inválida \n");
  return askQuestion("", options);
}

module.exports = { askQuestion };
