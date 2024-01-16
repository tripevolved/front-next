import {
  getStayByTripId,
  getAllReservedStaysByTripId,
  getTripHotelsToEditByTripId,
  setTripHotelToStay,
  getHotelDetails,
} from "./by-trip";

export const StaysApiService = {
  getByTripId: getStayByTripId,
  getAllReservedByTripId: getAllReservedStaysByTripId,
  getHotels: getTripHotelsToEditByTripId,
  setStay: setTripHotelToStay,
  getHotelDetails,
};
