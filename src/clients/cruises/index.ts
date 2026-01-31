import { getCruisesByType, getCruiseByUniqueName } from "./cruises";
import { getCruiseShip, getCruiseShipDetails, getCruiseShipAttractions } from "./cruiseships";

export const CruisesApiService = {
  getCruisesByType,
  getCruiseByUniqueName,
  getCruiseShip,
  getCruiseShipDetails,
  getCruiseShipAttractions
};
