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

