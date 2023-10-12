import type { TemplateStepsBuilderProps } from "@/features";
import { InitialStep } from "./trip-script-builder-initial.component";
import { TripScriptParametersStep } from "./trip-script-parameters-step.component";

export const SCRIPT_BUILDER_STEPS: TemplateStepsBuilderProps["steps"] = [
  {
    title: "Contruir meu roteiro",
    name: "initial",
    component: InitialStep,
  },
  {
    title: "Salva parâmetros do roteiro",
    name: "parameters",
    component: TripScriptParametersStep,
  }
];
