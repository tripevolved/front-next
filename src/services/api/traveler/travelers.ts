import { Traveler, TripTravelers } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

const travelersMocs: Traveler[] = [
  {
    cpf: "",
    rg: "",
    email: "email@email.com",
    fullName: "Jucélio Santos",
    id: "wehrpw65468",
    travelerId: "64f86s41f56sd",
  },
  {
    cpf: "48029830987",
    rg: "",
    email: "",
    fullName: "Flávia Santos",
    id: "wehrpw65468",
    travelerId: "64f86s41f56sd",
  },
];

export const getTripTravelers = async (tripId: string) => {
  const route = `travelers/trip/${tripId}`;
  const tripTravelers = await ApiRequest.get<TripTravelers>(route);
  tripTravelers.travelers = travelersMocs;
  return tripTravelers;
};
