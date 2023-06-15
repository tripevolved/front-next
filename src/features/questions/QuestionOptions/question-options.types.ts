import type { Question } from "@/services/api/common/questions.types";
import type { OptionsFieldListProps } from "@/ui";

export interface QuestionOptionsProps
  extends Question,
    Pick<OptionsFieldListProps, "onCheck" | "defaultValue" | "disabled"> {}
