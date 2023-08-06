import { TripDiscoverStepContentProps } from "../../TripDiscoverStepContent";
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
  title: string;
  name: TripDiscoverStep;
  component: (props: TripDiscoverStepContentProps) => JSX.Element;
};

export const GROUP_STEPS: GroupSteps[] = [
  {
    title: "Descobrir a minha viagem",
    name: "initial",
    component: InitialStep,
  },
  {
    title: "Descobrir meu perfil de viajante",
    name: "build-profile",
    component: StepBuildProfile,
  },
  {
    title: "Seu perfil de viajante é...",
    name: "profile",
    component: StepProfile,
  },
  {
    title: "Seu endereço",
    name: "register-city",
    component: StepRegisterCity,
  },
  {
    title: "Descobrir minha trip",
    name: "destinations",
    component: StepDestinations,
  },
  {
    title: "",
    name: "configuration",
    component: StepConfiguration,
  },
  {
    title: "",
    name: "trip-goal",
    component: StepTripGoal,
  },
  {
    title: "Finalização",
    name: "finish",
    component: StepFinish,
  },
];
