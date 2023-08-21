import { getStayByTripId, getAllReservedStaysByTripId } from "./by-trip";

export const StaysApiService = { getByTripId: getStayByTripId, getAllReservedByTripId: getAllReservedStaysByTripId };
