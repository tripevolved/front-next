import type { RiboProps } from "ribof/ribo";
import Ribo from "ribof/ribo";

import * as mars from "mars-ds";
import * as featureComponents from "@/features";
import * as uiComponents from "@/ui";
import { useAppStore } from "../store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalStorageService } from "@/services/store/local-storage.service";
import { GLOBAL_STORE_NAME } from "../configs/store.config";
import { jsonToString } from "@/utils/helpers/json.helpers";

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
  const data = useDataStore();
  return (
    <Ribo settings={settings} accesses={{ active: true, data }}>
      {children}
    </Ribo>
  );
}

// This rule ensures that the ribo app does not re-render each time the store is updated.
const useDataStore = () => {
  const [state, setState] = useState({});
  const router = useRouter();

  useEffect(() => {
    const data = LocalStorageService.getJson(GLOBAL_STORE_NAME) as any;
    if (!data) return;
    const newState = data.state;
    if (isEqualObjects(state, newState)) return;
    setState(newState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return state;
};

const isEqualObjects = (a: object, b: object) => {
  return jsonToString(a) === jsonToString(b);
};
