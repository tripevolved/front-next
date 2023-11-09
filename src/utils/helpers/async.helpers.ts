export const delay = (milliseconds = 2000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const pooling = async <T = unknown>(
  callback: () => Promise<T>,
  interval = 3000,
  retry = 20
): Promise<boolean> => {
  if (retry === 0) return false;
  try {
    await callback();
    return true;
  } catch (error) {
    await delay(interval);
    return pooling(callback, interval, retry - 1);
  }
};
