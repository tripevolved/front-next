import { QuestionPages } from "@/models";

export interface OnboardingState extends QuestionPages {}

export const initialState: OnboardingState = {
  questionCollection: [
    {
      page: null,
      questions: [],
    },
  ],
};
