import type { TemplateStepsBuilderProps } from "@/features";
import { InitialStep } from "./trip-script-builder-initial.component";
import { TripTypeStep } from "./trip-type-step.component";

export const SCRIPT_BUILDER_STEPS: TemplateStepsBuilderProps["steps"] = [
  {
    title: "Contruir meu roteiro",
    name: "initial",
    component: InitialStep,
  },
  {
    title: "Que tipo de viagem você quer?",
    name: "trip-type",
    component: TripTypeStep,
  }
];
