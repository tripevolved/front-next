import { jsonToString, toJson } from "@/helpers/json.helpers";

export const LocalStorageService = {
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value;
  },
  save: (key: string, data: string) => window.localStorage.setItem(key, data),
  getJson: <T = object>(key: string): T | null => toJson<T>(window.localStorage.getItem(key)),
  saveJson: (key: string, data: object) => window.localStorage.setItem(key, jsonToString(data)),
};
