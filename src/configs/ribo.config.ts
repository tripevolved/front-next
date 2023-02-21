import * as generalComponents from "@/components/general";
import * as mars from "mars-ds";

const componentsList = {
  ...mars,
  ...generalComponents,
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
