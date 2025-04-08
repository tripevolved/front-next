import { ComponentHTMLProps } from "@/core/types";
import { TextProps } from "../Text";

export interface AccordionProps {
  title?: string | TextProps;
  className?: string;
  defaultOpen?: boolean;
  heading?: HeaderAccordionProps;
  children?: any;
}

export interface FaqAccordionProps {
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
