import { ComponentHTMLProps } from "@/core/types";
import { HeadingProps, SectionBaseProps, TextProps } from "mars-ds";

export interface SectionFaqProps extends SectionBaseProps {
  heading?: HeadingProps;
  questions?: QuestionProps[];
}

export interface QuestionProps extends ComponentHTMLProps {
  question?: TextProps;
  answer?: TextProps;
}
