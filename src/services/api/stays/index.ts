import {
  getStayByTripId,
  getAllReservedStaysByTripId,
  getTripHotelsToEditByTripId,
  setTripHotelToStay,
  getHotelDetails,
} from "./by-trip";
import { getRecommendedStays } from "./recommended";

export const StaysApiService = {
  getByTripId: getStayByTripId,
  getAllReservedByTripId: getAllReservedStaysByTripId,
  getHotels: getTripHotelsToEditByTripId,
  setStay: setTripHotelToStay,
  getHotelDetails,
  getRecommendedStays
};
