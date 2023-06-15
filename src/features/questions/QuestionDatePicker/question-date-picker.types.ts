import type { Question } from "@/services/api/common/questions.types";
import type { DatePickerProps } from "@/ui";

export interface QuestionDatePickerProps
  extends Question,
    Pick<DatePickerProps, "onSet" | "dates" | "disabled"> {}
