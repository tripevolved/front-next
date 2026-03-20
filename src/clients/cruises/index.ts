import { getCruises, getCruiseByDestinationUniqueName, getCruiseByUniqueName } from "./cruises";
import { getCruiseShip, getCruiseShipDetails, getCruiseShipAttractions } from "./cruiseships";

export const CruisesApiService = {
  getCruises,
  getCruiseByUniqueName,
  getCruiseByDestinationUniqueName,
  getCruiseShip,
  getCruiseShipDetails,
  getCruiseShipAttractions
};
