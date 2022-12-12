import { OnboardingState } from "./state";
import { ActionType, OnboardingActions } from "./actions";

export function onboardingReducer(
  state: OnboardingState,
  action: OnboardingActions
): OnboardingState {
  switch(action.type) {
    case ActionType.SetQuestions:
      return {
        ...state,
        questionCollection: [...action.payload.questionCollection]
      };

    default:
      return state;
  }
}