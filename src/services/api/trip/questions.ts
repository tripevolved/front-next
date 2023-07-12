import { ApiRequest } from "@/services/api/request";
import { QuestionsResponse } from "../common/questions.types";

export const getTripQuestions = async () => ApiRequest.get<QuestionsResponse>("questions/trip");

export const getTripOnboardingQuestions = async () =>
  ApiRequest.get<QuestionsResponse>("questions/onboarding");
