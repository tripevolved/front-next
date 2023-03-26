import { ModalContentProps, TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";
import { ButtonProps } from "mars-ds";

export interface LeadListFormProps extends ComponentHTMLProps, FormLogicProps {
  label?: string;
  heading?: string | TextProps;
};

export interface FormLogicProps {
  cta?: ButtonProps;
};
