import { getTripScriptPreview } from "./preview";
import { getTripScript } from "./full";

export const TripScriptsApiService = {
  getPreview: getTripScriptPreview,
  getFull: getTripScript,
};
