import {
  getStayByTripId,
  getAllReservedStaysByTripId,
  getTripHotelsToEditByTripId,
  setTripHotelToStay,
  getHotelDetails,
  putTripStay,
} from "./by-trip";
import { getRecommendedStays } from "./recommended";
import { getLibraryStays } from "./library";

export const StaysApiService = {
  getByTripId: getStayByTripId,
  getAllReservedByTripId: getAllReservedStaysByTripId,
  getHotels: getTripHotelsToEditByTripId,
  setStay: setTripHotelToStay,
  getHotelDetails,
  getRecommendedStays,
  getLibraryStays,
  putTripStay,
};
