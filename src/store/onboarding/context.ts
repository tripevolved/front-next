import React from "react";
import { OnboardingState, initialState } from "./state";
import { OnboardingActions } from "./actions";

export const OnboardingContext = React.createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
