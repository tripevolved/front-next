import { getTripScriptPreview } from "./preview";
import { getTripScript } from "./full";
import { getAttractions } from "./attractions";
import { updateScript } from "./update-script";

export const TripScriptsApiService = {
  getPreview: getTripScriptPreview,
  getFull: getTripScript,
  getAttractions,
  updateScript,
};
