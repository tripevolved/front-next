import type { StepComponentProps, TemplateStepsBuilderProps } from "@/features";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepTripGoal } from "../TripSteps/step-trip-goal";
import { StepTravelersCount } from "../TripSteps/step-travelers-count";
import { StepCityDestination } from "../TripSteps/step-city-destination";
import { StepCityRegistration } from "../TripSteps/step-city-registration";
import { StepRoomChoice } from "../TripSteps/step-room-choice";
import { addMonths } from "date-fns";

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
    component: (props: StepComponentProps) => (
      <StepConfiguration
        {...props}
        startDate={String(addMonths(new Date(), 3))}
        endDate={String(addMonths(new Date(), 3))}
      />
    ),
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
