import type { TemplateStepsBuilderProps } from "@/features";
import { InitialStep } from "./trip-script-builder-initial.component";

export const SCRIPT_BUILDER_STEPS: TemplateStepsBuilderProps["steps"] = [
  {
    title: "Contruir meu roteiro",
    name: "initial",
    component: InitialStep,
  }
];
