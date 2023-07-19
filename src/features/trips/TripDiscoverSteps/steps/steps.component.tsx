import type { TripDiscoverStep } from "../trip-discover-steps.types";

import { StepBuildProfile } from "./step-build-profile";
import { StepConfiguration } from "./step-configuration";
import { StepDestinations } from "./step-destinations";
import { StepFinish } from "./step-finish";
import { InitialStep } from "./step-initial";
import { StepProfile } from "./step-profile";
import { StepRegisterCity } from "./step-register-city";
import { StepTripGoal } from "./step-trip-goal";

type GroupSteps = {
  name: TripDiscoverStep;
  component: any;
};

export const GROUP_STEPS: GroupSteps[] = [
  {
    name: "initial",
    component: InitialStep,
  },
  {
    name: "build-profile",
    component: StepBuildProfile,
  },
  {
    name: "profile",
    component: StepProfile,
  },
  {
    name: "register-city",
    component: StepRegisterCity,
  },
  {
    name: "destinations",
    component: StepDestinations,
  },
  {
    name: "configuration",
    component: StepConfiguration,
  },
  {
    name: "trip-goal",
    component: StepTripGoal,
  },
  {
    name: "finish",
    component: StepFinish,
  },
];
