import { ApiAuthorizedRequestService } from "../api-request.service";
import { QuestionsResponse } from "../common/questions";

export const getTripQuestions = async (): Promise<QuestionsResponse> => {
  const url = "questions/trip";
  return ApiAuthorizedRequestService.get<QuestionsResponse>(url).then(({ data }) => data);
};

export const getTripOnboardingQuestions = async (): Promise<QuestionsResponse> => {
  const url = "questions/onboarding";
  return ApiAuthorizedRequestService.get<QuestionsResponse>(url).then(({ data }) => data);
};
