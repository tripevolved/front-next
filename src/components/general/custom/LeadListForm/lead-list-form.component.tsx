import type { LeadListFormProps } from "./lead-list-form.types";

import { Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Card } from "mars-ds";
import { FormLogic } from "./lead-list-form-logic.component";

export function LeadListForm({
  className,
  children,
  sx,
  label = "SEJA PIONEIRO",
  heading = "Participe da lista de espera",
  cta,
  ...props
}: LeadListFormProps) {
  const cn = cx("lead-list-form", className, css(sx));
  return (
    <Card className={cn} {...props}>
      <div className="text-center">
        <Text className="lead-list-form__label py-xl" size="sm">
          {label}
        </Text>
        <Text as="h3" className="lead-list-form__heading pb-xl" variant="heading">
          {heading}
        </Text>
      </div>
      <FormLogic cta={cta} />
    </Card>
  );
}
