import { ApiRequest } from "@/services/api/request";
import { QuestionsResponse } from "../common/questions.types";

export const getTripQuestions = async () => ApiRequest.get<QuestionsResponse>("questions/trip");

export const getTripDestinationQuestions = async () =>
  ApiRequest.get<QuestionsResponse>("questions/destinations");
