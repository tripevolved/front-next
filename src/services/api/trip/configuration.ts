import { ApiRequest } from "@/services/api/request";
import { Travelers, TripDates, TripPeriod } from "./create";
import { UserService } from "@/services/user";

interface EditTripConfigurationRequest {
  period: TripPeriod;
  dates: TripDates;
  maxBudget: number;
  travelers: Travelers;
}

export type EditTripDto = {
  days: number;
  dates: [Date, Date];
  maxBudget: number;
  travelers: Pick<Travelers, "adults">;
  tripId: string;
};

export type EditTrip = {
  id: string;
};

export const editTrip = async ({
  days,
  dates,
  maxBudget,
  travelers,
  tripId,
}: EditTripDto): Promise<EditTrip> => {
  const url = `trips/${tripId}/configuration`;

  const parsedDates = {
    startDate: dates[0],
    endDate: dates[1],
  } as TripDates;
  const trip = {
    period: { maxDays: days, minDays: days },
    dates: parsedDates,
    maxBudget,
    travelers: {
      adults: travelers.adults || 2,
      children: 0,
      type: 0,
    },
  } satisfies EditTripConfigurationRequest;
  const { id } = await ApiRequest.put<EditTrip>(url, trip);
  await UserService.updateTravelerState();
  return { id };
};
