export const LocalStorageService = {
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value;
  },
  update: (key: string, data: string) => window.localStorage.setItem(key, data),
};
