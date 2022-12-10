import { Question, QuestionCollection } from "@/models";

export enum ActionType {
	AddQuestion,
	SetQuestions,
}

export interface AddQuestion {
	type: ActionType.AddQuestion;
	payload: Question;
}

export interface SetQuestions {
	type: ActionType.SetQuestions;
	payload: QuestionCollection;
}
