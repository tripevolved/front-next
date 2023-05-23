import type { RiboProps } from "ribof/ribo";
import Ribo from "ribof/ribo";

import * as mars from "mars-ds";
import * as featureComponents from "@/features";
import * as uiComponents from "@/ui";

// This order fix development environment
const componentsList = {
  ...featureComponents,
  ...mars,
  ...uiComponents,
};

export const settings = {
  defaultError: "",
  componentsList,
  controllersList: {},
  modifiersList: {},
};

export const accesses = {
  active: false,
  data: {},
};

export function AppRibo({ children }: RiboProps["children"]) {
  return (
    <Ribo settings={settings} accesses={accesses}>
      {children}
    </Ribo>
  );
}
