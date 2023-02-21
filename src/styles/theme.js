const colors = {
  brand: {
    1: "#0AB9AD",
    2: "#1A365D",
    3: "#8253F6",
    4: "#F5AC0A",
    5: "#EEFBFA",
    6: "#B6EAE6",
  },
  gray: {
    1: "#5A626D",
    2: "#8C8E92",
    3: "#D7DADE",
    4: "#FFFFFF",
  },
};

function colortToCssVars() {
  let result = "";
  for (const key in colors) {
    const group = colors[key];
    for (const subkey in group) {
      const color = group[subkey]
      result += `--color-${key}-${subkey}: ${color};\n`;
    }
  }
  return result;
}

console.log(colortToCssVars());
