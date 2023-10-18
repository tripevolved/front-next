import { QuestionsResponse } from "../common/questions.types";
import { ApiRequest } from "@/services/api/request";

export const getQuestions = async (tripId: string) => {
  const route = `restaurants/${tripId}/questions`;
  const questions = await ApiRequest.get<QuestionsResponse>(route);
  return questions;
};
