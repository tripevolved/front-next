import { ApiRequest } from "@/services/api/request";
import { LeadApiService } from "../lead";
import { error } from "console";

interface CreateTripRequest {
  travelerId: string;
  destinationId: string;
  tripBehavior: TripBehaviorAnswer[];
  period: TripPeriod;
  dates: TripDates;
  maxBudget: number;
}

interface TripBehaviorAnswer {
  questionId: string;
  answers: string[];
}

interface TripPeriod {
  minDays: number;
  maxDays: number;
}

interface TripDates {
  startDate?: Date;
  endDate?: Date;
  month?: number;
  anyMonthFlexibility: boolean;
}

export type CreateTripDto = {
  destinationId: string;
  tripBehavior: Record<string, string[]>;
  days: number;
  dates: [Date, Date];
  maxBudget: number;
};

export type CreatedTrip = {
  id: string;
};

const parseAnswers = (answers: Record<string, string[]>): TripBehaviorAnswer[] => {
  const result: TripBehaviorAnswer[] = [];

  for (const [questionId, ids] of Object.entries(answers)) {
    result.push({ questionId, answers: ids });
  }
  return result;
};

export const createTrip = async ({
  destinationId,
  tripBehavior,
  days,
  dates,
  maxBudget,
}: CreateTripDto): Promise<CreatedTrip> => {
  const url = "trips/create";

  const lead = LeadApiService.getLocal();
  const travelerId = lead?.id;
  if (travelerId === undefined) throw new Error("Traveler not found");

  const tripBehaviorAnswers = parseAnswers(tripBehavior);
  const parsedDates = {
    startDate: dates[0],
    endDate: dates[1],
  } as TripDates;
  const trip = {
    travelerId: travelerId,
    destinationId,
    tripBehavior: tripBehaviorAnswers,
    period: { maxDays: days, minDays: days },
    dates: parsedDates,
    maxBudget,
  } satisfies CreateTripRequest;
  const { id } = await ApiRequest.post<CreatedTrip>(url, trip);

  return { id };
};
