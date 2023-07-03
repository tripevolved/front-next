import type { OptionsSliderProps } from "@/ui";
import type { Question } from "@/services/api/common/questions.types";

export interface QuestionSliderProps
  extends Question,
    Pick<OptionsSliderProps, "onSet" | "defaultValue" | "disabled"> {}
