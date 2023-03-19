import { jsonToString, toJson } from "@/helpers/json.helpers";

export const LocalStorageService = {
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    if (typeof value === "string") return toJson(value);
    return {};
  },
  update: (key: string, data: object) => window.localStorage.setItem(key, jsonToString(data)),
};
