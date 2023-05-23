export const toCamelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (m, c) => c.toUpperCase());
};

export const toLowerCase = (str: string) => {
  return str.toLowerCase().replace(/[ ](\w)/g, (m, c) => c);
};
