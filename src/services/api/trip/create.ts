import { ApiRequest } from "@/services/api/request";
import { AnswersDto } from "../profile/answers";

interface CreateTripRequest {
  travelerId: string;
  destinationId: string;
  tripBehavior: TripBehaviorAnswer[];
  period: TripPeriod;
  dates: TripDates;
  maxBudget: number;
  travelers: Travelers;
}

interface Travelers {
  type: number;
  adults: number;
  children: number;
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
  travelerId: string;
  destinationId: string;
  tripBehavior: AnswersDto;
  days: number;
  dates: [Date, Date];
  maxBudget: number;
  travelers: Pick<Travelers, "adults">;
};

export type CreatedTrip = {
  id: string;
};

const parseAnswers = (answers: AnswersDto): TripBehaviorAnswer[] => {
  const result: TripBehaviorAnswer[] = [];

  for (const questionId in answers) {
    const ids = answers[questionId];
    result.push({ questionId, answers: Array.isArray(ids) ? ids : [ids] });
  }

  return result;
};

export const createTrip = async ({
  travelerId,
  destinationId,
  tripBehavior,
  days,
  dates,
  maxBudget,
  travelers,
}: CreateTripDto): Promise<CreatedTrip> => {
  const url = "trips/create";

  const tripBehaviorAnswers = parseAnswers(tripBehavior);
  const parsedDates = {
    startDate: dates[0],
    endDate: dates[1],
  } as TripDates;
  const trip = {
    travelerId,
    destinationId,
    tripBehavior: tripBehaviorAnswers,
    period: { maxDays: days, minDays: days },
    dates: parsedDates,
    maxBudget,
    travelers: {
      adults: travelers.adults || 2,
      children: 0,
      type: 0,
    },
  } satisfies CreateTripRequest;
  const { id } = await ApiRequest.post<CreatedTrip>(url, trip);

  return { id };
};
