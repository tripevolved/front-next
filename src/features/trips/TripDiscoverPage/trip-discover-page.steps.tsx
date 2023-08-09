import type { TemplateStepsBuilderProps } from "@/features";
import { InitialStep } from "../TripSteps/step-initial";
import { StepBuildProfile } from "../TripSteps/step-build-profile";
import { StepProfile } from "../TripSteps/step-profile";
import { StepCityRegistration } from "../TripSteps/step-city-registration";
import { StepTrip } from "../TripSteps/step-trip";

export const GROUP_STEPS: TemplateStepsBuilderProps["steps"] = [
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
    component: StepCityRegistration,
  },
  {
    title: "Descobrir minha trip",
    name: "destinations",
    component: StepTrip,
  },
];
