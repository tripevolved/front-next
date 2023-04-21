import { ensureNotSlashEnds, ensureNotSlashStarts } from "@/helpers/url.helper";

export const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");

export const getUrlApi = (route = "") => `${API_URL}/api/${ensureNotSlashStarts(route)}`;

// export const newModel = (route = "") => {
//   const url = `${API_URL}/${ensureNotSlashStarts(route)}`;

//   const get = (path)
// }
