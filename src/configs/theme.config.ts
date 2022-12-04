import { extendTheme } from "@chakra-ui/react";
import { fontBody, fontDisplay } from "./font-family.config";

const colors = {
  primary: {
    50: "hsl(176, 90%, 95%)",
    100: "hsl(176, 90%, 85%)",
    200: "hsl(176, 90%, 75%)",
    300: "hsl(176, 90%, 65%)",
    400: "hsl(176, 90%, 55%)",

    500: "hsl(176, 90%, 38%)",
    600: "hsl(176, 90%, 25%)",
    700: "hsl(176, 90%, 20%)",
    800: "hsl(176, 90%, 15%)",
    900: "hsl(176, 90%, 5%)",
  },
  secondary: {
    50: "hsl(215.68, 56.92%, 87.25%)",
    100: "hsl(214.86, 56.92%, 74.51%)",
    200: "hsl(214.91, 56.12%, 61.57%)",
    300: "hsl(214.89, 56.63%, 48.82%)",
    400: "hsl(214.62, 56.52%, 36.08%)",
    500: "hsl(214.93, 56.3%, 23.33%)",
    600: "hsl(215.36, 56%, 19.61%)",
    700: "hsl(214.67, 56.96%, 15.49%)",
    800: "hsl(215.29, 56.67%, 11.76%)",
    900: "hsl(215.45, 55%, 7.84%)",
  },
  ternary: {
    50: "hsl(41.54, 90.7%, 91.57%)",
    100: "hsl(41.01, 92.94%, 83.33%)",
    200: "hsl(41.69, 92.19%, 74.9%)",
    300: "hsl(41.54, 91.76%, 66.67%)",
    400: "hsl(41.33, 92.45%, 58.43%)",
    500: "hsl(41.36, 92.16%, 50%)",
    600: "hsl(41.33, 92.45%, 41.57%)",
    700: "hsl(41.54, 91.76%, 33.33%)",
    800: "hsl(41.19, 92.19%, 25.1%)",
    900: "hsl(41.01, 92.94%, 16.67%)",
  },

  brand: {
    1: "#0AB9AD",
    2: "#1A365D",
    3: "#8253F6",
    4: "#F5AC0A",
    5: "#EEFBFA",
    6: "#B6EAE6",
  },
  gray: {
    1: "#5A626D",
    2: "#8C8E92",
    3: "#D7DADE",
    4: "#FFFFFF",
  },
};

const fonts = {
  heading: fontDisplay.style.fontFamily,
  body: fontBody.style.fontFamily,
};

const components = {
  Button: { baseStyle: fontDisplay.style },
};

export const customTheme = extendTheme({ colors, fonts, components });
