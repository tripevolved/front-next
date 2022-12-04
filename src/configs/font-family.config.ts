import { Baloo_2, Comfortaa } from "@next/font/google";

export const fontDisplay = Comfortaa({
  subsets: ["latin"],
  weight: ["500"],
});

export const fontBody = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const fontFamilyClassName = [
  fontDisplay.className,
  fontBody.className,
].join(" ");
