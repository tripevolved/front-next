import { ComponentHTMLProps } from "@/core/types";
import { TextProps } from "../Text";

export interface AccordionProps {
  question?: string | TextProps;
  answer?: string | TextProps;
  defaultOpen?: boolean;
  heading?: HeaderAccordionProps;
  children?: any;
}

export interface HeaderAccordionProps extends ComponentHTMLProps {
  heading?: string | TextProps;
  image?: string;
}
