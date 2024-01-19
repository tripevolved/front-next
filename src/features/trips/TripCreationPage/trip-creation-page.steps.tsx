import type { TemplateStepsBuilderProps } from "@/features";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepTripGoal } from "../TripSteps/step-trip-goal";
import { StepFinish } from "../TripSteps/step-finish";
import { StepCityDestination } from "../TripSteps/step-city-destination";
import { StepCityRegistration } from "../TripSteps/step-city-registration";

export const GROUP_STEPS: TemplateStepsBuilderProps["steps"] = [
  {
    title: "Escolher destino",
    name: "city-destination",
    component: StepCityDestination,
  },
  {
    title: "Seu endereço",
    name: "register-city",
    component: StepCityRegistration,
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
