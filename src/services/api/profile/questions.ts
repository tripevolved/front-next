import { ApiRequest } from "@/services/api/request";
import { QuestionsResponse } from "../common/questions.types";

export const getQuestions = async () =>
  ApiRequest.get<QuestionsResponse>("questions/travel-profile");
