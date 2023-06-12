type OptionType = "TEXT";

interface Option {
  id: string;
  title: string;
  mappingField: string | null;
  uniqueName: string | null;
  type: OptionType;
}

type QuestionType = "CHECKBOX" | "RADIO" | "RANGE" | "DATEPICK";

export interface Question {
  id: string;
  emoji: string;
  type: QuestionType;
  title: string;
  subtitle: string | null;
  minValue?: number;
  maxValue?: number;
  dataType?: "CURRENCY" | "DAYS";
  step?: number;
  possibleAnswers: Option[];
}

export interface QuestionsPage {
  page: number;
  questions: Question[];
}

export type QuestionsResponse = QuestionsPage[];
