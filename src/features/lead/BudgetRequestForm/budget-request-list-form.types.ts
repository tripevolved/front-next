import { TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";
import { ButtonProps } from "mars-ds";

export interface BudgetRequestListFormProps extends ComponentHTMLProps, BudgetRequestFormLogicProps {
  label?: string;
  heading?: string | TextProps;
}

export interface BudgetRequestFormLogicProps {
  cta?: ButtonProps;
}
