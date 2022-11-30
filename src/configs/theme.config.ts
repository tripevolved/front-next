import { createTheme, Theme } from "@nextui-org/react";
import { fontBody } from "./font-family.config";

const fonts = {
  sans: fontBody.style.fontFamily,
};

const colors = {
  // brand colors
  primaryLight: "$green200",
  primaryLightHover: "$green300",
  primaryLightActive: "$green400",
  primaryLightContrast: "$green600",
  primary: "#0AB9AD",
  primaryBorder: "$green500",
  primaryBorderHover: "$green600",
  primarySolidHover: "$green700",
  primarySolidContrast: "$white",
  primaryShadow: "#1A365D",

  text: "#1A365D",
};

const sharedTheme: Theme = {
  theme: {
    fonts,
    colors,
  },
};

export const lightTheme = createTheme({
  type: "light",
  ...sharedTheme,
});

export const darkTheme = createTheme({
  type: "dark",
  ...sharedTheme,
});
