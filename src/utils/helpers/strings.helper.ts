export const toCamelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (m, c) => c.toUpperCase());
};

const toLowerCaseWithReg = (str: string) => {
  return str.toLowerCase().replace(/[ ](\w)/g, (m, c) => c);
};

export const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const trimAfterParentheses = (str?: string) => str ? str.replace(/\(.*/, '') : str;
