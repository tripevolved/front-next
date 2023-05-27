export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateHash = (prefix = "hash") =>
  `${prefix}-${(Math.random() * 1000000).toFixed(0)}`;
