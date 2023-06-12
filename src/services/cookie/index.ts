import Cookies from "js-cookie";

export const CookieService = {
  get: Cookies.get,
  set: Cookies.set,
  del: Cookies.remove,
};
