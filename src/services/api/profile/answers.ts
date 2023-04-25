import { delay } from "@/helpers/delay.helpers";
import { ApiRequestService } from "../api-request.service";
import { LeadApiService } from "../lead";
import { getResult } from "./result";

interface AnswersRequest {
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

export const sendAnswers = async ({ answers, email }: AnswersBody) => {
  const url = "profiles/answers";
  const { travelerId } = await LeadApiService.getByEmail(email);

  const data = {
    travelerId,
    answers: parseAnswers(answers),
  } satisfies AnswersRequest;

  await ApiRequestService.post<{ id: string }>(url, data);
  // TODO: remove bellow lines when api returns the `uniqueName` result
  await delay();
  return getResult({ travelerId });
};
