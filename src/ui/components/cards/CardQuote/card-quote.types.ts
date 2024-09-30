import type { ComponentHTMLProps } from "@/core/types";
import type { ButtonProps } from "mars-ds";

export interface CardQuoteProps extends ComponentHTMLProps {
  footer?: string;
  footerSub?: string;
  text?: string;
  avatar?: string;
  cta?: ButtonProps;
}
