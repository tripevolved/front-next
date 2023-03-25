import { jsonToString } from "@/helpers/json.helpers";

export const LocalStorageService = {
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value;
  },
  update: (key: string, data: object) => window.localStorage.setItem(key, jsonToString(data)),
};
