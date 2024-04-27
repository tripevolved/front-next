import { TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";
import { ButtonProps } from "mars-ds";

export interface BudgetRequestListFormProps extends ComponentHTMLProps, FormLogicProps {
  label?: string;
  heading?: string | TextProps;
}

export interface FormLogicProps {
  cta?: ButtonProps;
}
