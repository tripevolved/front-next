export const delay = (milliseconds = 2000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
