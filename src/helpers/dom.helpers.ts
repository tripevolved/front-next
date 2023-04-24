import { isServer } from "./environment.helpers";

export const scrollToTop = (smooth = true) => {
  if (isServer()) return;
  const behavior = smooth ? "smooth" : "auto";
  window.scrollTo({ top: 0, behavior });
};
