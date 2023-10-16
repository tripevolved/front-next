import { getTripScriptPreview } from "./preview";
import { getTripScript } from "./full";
import { getAttractions } from "./attractions";
import { updateScript } from "./update-script";
import { getTripCharacteristics } from "./characteristics";
import { setTripScriptParameters } from "./parameters";

export const TripScriptsApiService = {
  getPreview: getTripScriptPreview,
  getFull: getTripScript,
  getAttractions,
  updateScript,
  getTripCharacteristics,
  postParameters: setTripScriptParameters,
};
