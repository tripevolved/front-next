import { getCruises, getCruiseByUniqueName } from "./cruises";
import { getCruiseShip, getCruiseShipDetails, getCruiseShipAttractions } from "./cruiseships";

export const CruisesApiService = {
  getCruises,
  getCruiseByUniqueName,
  getCruiseShip,
  getCruiseShipDetails,
  getCruiseShipAttractions
};
