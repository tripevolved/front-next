import type { TemplateStepsBuilderProps } from "@/features";
import { InitialStep } from "./trip-script-builder-initial.component";

export const SCRIPT_BUILDER_STEPS: TemplateStepsBuilderProps["steps"] = [
  {
    title: "Descobrir a minha viagem",
    name: "initial",
    component: InitialStep,
  }
];
