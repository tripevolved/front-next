import { getTripDetailsById } from "./details";
import { TripLocalService } from "./local";

export const TripsApiService = { getById: getTripDetailsById, getCurrentTripId: TripLocalService.get };
