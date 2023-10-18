import { QuestionsResponse } from "../common/questions.types";
import { ApiRequest } from "@/services/api/request";

export const getQuestions = async () => {
  const route = `restaurants/questions`;
  const questions = await ApiRequest.get<QuestionsResponse>(route);
  return questions;
};
