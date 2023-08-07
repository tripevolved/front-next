import type { TripDiscoverStepContentProps } from "@/features";
import { StepBuildProfile } from "./step-build-profile";
import { InitialStep } from "./step-initial";
import { StepProfile } from "./step-profile";
import { StepRegisterCity } from "./step-register-city";
import { StepTrip } from "./step-trip";

type GroupSteps = {
  title: string;
  name: string;
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
    component: StepTrip,
  },
];
