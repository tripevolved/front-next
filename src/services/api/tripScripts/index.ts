import { getTripScriptPreview } from "./preview";
import { getTripScript } from "./full";
import { getAttractions } from "./attractions";
import { updateScript } from "./update-script";
import { getTripCharacteristics } from "./characteristics";
import { setTripScriptParameters } from "./parameters";
import { getTripScriptBuilderParams } from "./builder-params";
import { getTripScriptDaySuggestion } from "./day-suggestion";
import { getTripScriptDayTip } from "./day-tip";

export const TripScriptsApiService = {
  getPreview: getTripScriptPreview,
  getFull: getTripScript,
  getAttractions,
  updateScript,
  getTripCharacteristics,
  postParameters: setTripScriptParameters,
  getBuilderParams: getTripScriptBuilderParams,
  getDaySuggestion: getTripScriptDaySuggestion,
  getDayTip: getTripScriptDayTip,
};
