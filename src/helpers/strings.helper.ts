export const toCamelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (m, c) => c.toUpperCase());
};
