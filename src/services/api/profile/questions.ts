import { ApiRequestService } from "../api-request.service";
import { QuestionsResponse } from "../common/questions";

export const getQuestions = async (): Promise<QuestionsResponse> => {
  const url = "questions/travel-profile";
  return ApiRequestService.get<QuestionsResponse>(url).then(({ data }) => data);
};
