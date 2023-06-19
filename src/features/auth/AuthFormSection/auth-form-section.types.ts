import type { ComponentHTMLProps } from "@/core/types";
import type { ButtonProps, TextProps } from "@/ui";
import type { SubmitHandler } from "@/utils/helpers/form.helpers";

export interface AuthFormSectionProps extends ComponentHTMLProps {
  heading?: string | TextProps;
  buttonActions?: ButtonProps[];
  submitting: boolean;
  submitButton: ButtonProps;
  onSubmitHandler: SubmitHandler;
}
