import { ApiRequest } from "@/services/api/request";
import { LeadApiService } from "@/services/api/lead";
import { getResult } from "./result";
import { UserService } from "@/services/user";

interface AnswersPayload {
  travelerId: string;
  answers: Answer[];
}

type AnswerIds = string | string[];
export type AnswersDto = Record<string, AnswerIds>;

interface Answer {
  answerDate: string;
  questionId: string;
  possibleAnswerId: string;
}

export interface AnswersBody {
  answers: AnswersDto;
  email: string;
}

export interface AnswersBodyById {
  answers: AnswersDto;
  travelerId: string;
}

const parseAnswers = (answers: AnswersDto): Answer[] => {
  const result: Answer[] = [];
  const answerDate = new Date().toISOString();

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

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendAnswers = async ({ answers, email }: AnswersBody) => {
  const url = "profiles/answers";
  const lead = undefined; //await LeadApiService.getByEmail(email);
  if (!lead) throw new Error("Lead is not found");

  const { id } = lead;
  const payload: AnswersPayload = {
    travelerId: id,
    answers: parseAnswers(answers),
  };

  const response = await ApiRequest.post(url, payload).then(async () => {
    await delay(6000);
    return await getResult({ id });
  });
  await UserService.updateTravelerState();
  return response;
};

export const sendAnswersByTravelerId = async ({ answers, travelerId }: AnswersBodyById) => {
  const url = "profiles/answers";
  const payload: AnswersPayload = {
    travelerId: travelerId,
    answers: parseAnswers(answers),
  };

  const response = await ApiRequest.post(url, payload);
  await UserService.updateTravelerState();
  return response;
};
