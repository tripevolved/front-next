import { getDestinations } from "./destinations";
import { getDestinationByUniqueName } from "./public";
import { postDestinationCuratorshipSuggestion } from "./suggestions";

export const DestinationsApiService = {
  getDestinations,
  getDestinationByUniqueName,
  postDestinationCuratorshipSuggestion,
};
