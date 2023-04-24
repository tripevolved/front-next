import { isServer } from "./environment.helpers";

export const scrollToTop = (smooth = true) => {
  if (isServer()) return;
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};
