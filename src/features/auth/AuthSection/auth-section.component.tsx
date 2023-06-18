import type { AuthSectionProps } from "./auth-section.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Card } from "mars-ds";
import { Picture, SectionBase, Text } from "@/ui";

export function AuthSection({
  heading,
  className,
  children,
  sx,
  withCard,
  ...props
}: AuthSectionProps) {
  const cn = makeCn("auth-section", className)();

  return (
    <SectionBase container="xs" className={cn} {...props}>
      <div className="auth-section__element mb-lg">
        <Picture
          className="auth-section__logo"
          alt="Logo da Trip Evolved"
          style={{ height: 40, width: 48 }}
          src="/brand/logo-symbol-circle.svg"
        />
        <Text className="auth-section__title" heading size="xs">
          {heading}
        </Text>
      </div>
      <div className="auth-section__element">
        {!withCard ? (
          <>{children}</>
        ) : (
          <Card elevation="md" className="auth-section__card">
            {children}
          </Card>
        )}
      </div>
    </SectionBase>
  );
}
