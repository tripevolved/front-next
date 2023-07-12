import type { ComponentHTMLProps } from "@/core/types";
import type { TextProps } from "@/ui";
import type { SubmitHandler } from "@/utils/helpers/form.helpers";
import { ButtonProps } from "mars-ds";

export interface AuthFormSectionProps extends ComponentHTMLProps {
  heading?: string | TextProps;
  buttonActions?: ButtonProps[];
  submitting: boolean;
  submitButton: ButtonProps;
  onSubmitHandler: SubmitHandler;
}
