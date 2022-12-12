import { Question, QuestionPages } from "@/models";

export enum ActionType {
	AddQuestion,
	SetQuestions,
}

/**
 * @deprecated
 */
export interface AddQuestion {
	type: ActionType.AddQuestion;
	payload: Question;
}

export interface SetQuestions {
	type: ActionType.SetQuestions;
	payload: QuestionPages;
}

export type OnboardingActions = AddQuestion | SetQuestions;
