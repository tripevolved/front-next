import { useEffect } from "react";
import { GTMService } from "./gtm-service";
import { DATA_LAYER_NAME } from "./constants";

const GTM_ID = "NPW6LMRB";

export const useAnalytics = () => {
  useEffect(() => {
    GTMService.initialize(GTM_ID, DATA_LAYER_NAME)
    return () => GTMService.destroy();
  }, []);
}
