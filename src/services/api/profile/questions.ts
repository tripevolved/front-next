import { ApiRequestService } from "../api-request.service";

type OptionType = "TEXT";

interface Option {
  id: string;
  title: string;
  mappingField: string | null;
  uniqueName: string | null;
  type: OptionType;
}

type QuestionType = "CHECKBOX" | "RADIO";

export interface ProfileQuestion {
  id: string;
  emoji: string;
  type: QuestionType;
  title: string;
  subtitle: string | null;
  possibleAnswers: Option[];
}

export interface ProfileQuestionsPage {
  page: number;
  questions: ProfileQuestion[];
}

export type ProfileQuestionsResponse = ProfileQuestionsPage[];

export const getQuestions = async (): Promise<ProfileQuestionsResponse> => {
  const url = "questions/travel-profile";
  return ApiRequestService.get<ProfileQuestionsResponse>(url).then(({ data }) => data);
};

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
  leadId: string;
  answers: AnswersDto;
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

export const sendAnswers = async ({ leadId, answers }: AnswersBody) => {
  const url = "profiles/answers";
  const data = {
    travelerId: leadId,
    answers: parseAnswers(answers),
  } satisfies AnswersRequest;
  return ApiRequestService.post<{ id: string }>(url, data).then(({ data }) => ({
    profileSlug: data.id,
  }));
};
