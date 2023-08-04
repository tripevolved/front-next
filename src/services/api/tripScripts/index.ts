import { getTripScriptPreview } from "./preview";
import { getTripScript } from "./full";
import { getAttractions } from "./attractions";

export const TripScriptsApiService = {
  getPreview: getTripScriptPreview,
  getFull: getTripScript,
  getAttractions,
};
