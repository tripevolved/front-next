export enum QuestionType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  RANGE = "RANGE",
  HYBRID = "HYBRID",
}

export enum PossibleAnswersType {
  IDENTITY = "IDENTITY",
  CHECKBOX = "CHECKBOX",
  TEXT = "TEXT",
  TEXT_AND_DROPDOWN = "TEXT_AND_DROPDOWN",
  DATE = "DATE",
}

export type PossibleAnswers = {
  id?: String;
  title?: String;
  type?: PossibleAnswersType;
};

export type Question = {
  id?: String;
  emoji?: String;
  title?: String;
  subtitle?: String | null;
  type?: QuestionType;
  possibleAnswers?: Array<PossibleAnswers>;
};

export type QuestionCollection = {
  page?: number | null;
  questions?: Question[];
};

export type QuestionPages = {
  questionCollection?: QuestionCollection[];
}
