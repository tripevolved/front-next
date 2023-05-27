import type { RiboProps } from "ribof/ribo";
import Ribo from "ribof/ribo";

import * as mars from "mars-ds";
import * as featureComponents from "@/features";
import * as uiComponents from "@/ui";
import { useAppStore } from "../store";

const controllersList = {
  getStore: () => useAppStore.getState(),
};

// This order fix development environment
const componentsList = {
  ...featureComponents,
  ...mars,
  ...uiComponents,
};

export const settings = {
  defaultError: "",
  componentsList,
  controllersList,
  modifiersList: {},
};

export function AppRibo({ children }: RiboProps["children"]) {
  const data = useAppStore();

  return (
    <Ribo settings={settings} accesses={{ active: true, data }}>
      {children}
    </Ribo>
  );
}
