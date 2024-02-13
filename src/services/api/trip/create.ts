import { ApiRequest } from "@/services/api/request";
import { AnswersDto } from "../profile/answers";
import { UserService } from "@/services/user";

interface NewTripPayload {
  travelerId: string;
  destinationId: string;
  tripBehavior: TripBehaviorAnswer[];
  period: TripPeriod;
  dates: TripDates;
  maxBudget: number;
  travelers: Travelers;
}

export interface Travelers {
  type: number;
  adults: number;
  children: number;
  childrenAges: number[];
  rooms?: TravelerRoomInfo[];
}

interface TravelerRoomInfo {
  adults: number;
  children: number;
  childrenAges: number[];
}

interface TripBehaviorAnswer {
  questionId: string;
  answers: string[];
}

export interface TripPeriod {
  minDays: number;
  maxDays: number;
}

export interface TripDates {
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
  travelers: Pick<Travelers, "adults" | "children" | "childrenAges" | "rooms">;
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
  const trip: NewTripPayload = {
    travelerId,
    destinationId,
    tripBehavior: tripBehaviorAnswers,
    period: { maxDays: days, minDays: days },
    dates: parsedDates,
    maxBudget,
    travelers: {
      adults: travelers.adults || 2,
      children: travelers.children || 0,
      childrenAges: travelers.childrenAges || [],
      type: 0,
    },
  };
  const { id } = await ApiRequest.post<CreatedTrip>(url, trip);
  await UserService.updateTravelerState();
  return { id };
};
