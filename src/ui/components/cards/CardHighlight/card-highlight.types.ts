import type { ComponentHTMLProps } from "@/core/types";
import type { TextProps } from "@/ui";
import type { ButtonProps } from "mars-ds";

export interface CardHighlightProps extends ComponentHTMLProps {
  variant?: "default" | "info" | "warning";
  heading?: string;
  text?: TextProps | string;
  cta?: ButtonProps;
}
