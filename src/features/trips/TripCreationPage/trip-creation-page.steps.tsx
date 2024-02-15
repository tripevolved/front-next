import type { TemplateStepsBuilderProps } from "@/features";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepTripGoal } from "../TripSteps/step-trip-goal";
import { StepTravelersCount } from "../TripSteps/step-travelers-count";
import { StepCityDestination } from "../TripSteps/step-city-destination";
import { StepCityRegistration } from "../TripSteps/step-city-registration";
import { StepRoomChoice } from "../TripSteps/step-room-choice";

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
    title: "Configuração da Viagem",
    name: "configuration",
    component: StepConfiguration,
  },
  {
    title: "Objetivos da viagem",
    name: "trip-goal",
    component: StepTripGoal,
  },
  {
    title: "Pessoas da viagem",
    name: "travelers",
    component: StepTravelersCount,
  },
  {
    title: "Quartos",
    name: "rooms",
    component: StepRoomChoice,
  },
];
