import { RestaurantParameter } from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { AnswersDto } from "../profile/answers";

const parseAnswers = (answers: AnswersDto): RestaurantParameter[] => {
  const result: RestaurantParameter[] = [];
  const answerDate = new Date();

  for (const [questionId, ids] of Object.entries(answers)) {
    if (!Array.isArray(ids)) {
      const possibleAnswerId = ids;
      result.push({ answerDate, questionId, possibleAnswerId });
      continue;
    }
    for (const possibleAnswerId of ids) {
      result.push({ answerDate, questionId, possibleAnswerId });
    }
  }
  return result;
};

export const setRestaurantParametersToTrip = async (tripId: string, answers: AnswersDto) => {
  const parameters = parseAnswers(answers);

  const route = `restaurants/${tripId}/parameters`;
  const questions = await ApiRequest.put(route, parameters);
  return questions;
};
