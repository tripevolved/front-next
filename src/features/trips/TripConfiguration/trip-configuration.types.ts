import type { ComponentHTMLProps } from "@/core/types";
import { DatePickerProps } from "@/ui";

export interface TripConfigurationProps extends ComponentHTMLProps,
    Pick<DatePickerProps, "onSet" | "dates" | "disabled"> {
  title: string;
};
