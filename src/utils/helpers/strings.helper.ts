import copy from "copy-to-clipboard";

export const toCamelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (m, c) => c.toUpperCase());
};

export const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const trimAfterParentheses = (str?: string) => (str ? str.replace(/\(.*/, "") : str);

export const copyToClipboard = (str: string, message: string) => {
  copy(str);
};
