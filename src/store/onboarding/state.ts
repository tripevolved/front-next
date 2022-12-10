import { QuestionCollection } from "@/models";

export interface OnboardingState extends QuestionCollection {}

export const initialState: OnboardingState = {
  page: null,
	questions: [],
}