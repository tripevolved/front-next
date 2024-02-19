import type { AuthFormSectionProps } from "./auth-form-section.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Card, SubmitButton } from "mars-ds";
import { handleFormSubmit } from "@/utils/helpers/form.helpers";
import { AuthSection } from "../AuthSection";

export function AuthFormSection({
  buttonActions,
  className,
  children,
  heading,
  onSubmitHandler,
  submitting,
  submitButton,
  ...props
}: AuthFormSectionProps) {
  const cn = makeCn("auth-form-section", className)();

  return (
    <AuthSection heading={heading} className={cn} {...props}>
      <form className="auth-section__element" onSubmit={handleFormSubmit(onSubmitHandler)}>
        <Card elevation="md" className="auth-section__card">
          {children}
        </Card>
        <SubmitButton {...submitButton} submitting={submitting} />
      </form>
      {buttonActions?.map((action, key) => (
        <div key={action.id || key} className="auth-section__element">
          <Button variant="naked" {...action} />
        </div>
      ))}
    </AuthSection>
  );
}
