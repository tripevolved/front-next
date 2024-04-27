import type { BudgetRequestListFormProps } from "./budget-request-list-form.types";

import { Text } from "@/ui";
import { css, cx } from "@emotion/css";
import { Card } from "mars-ds";
import { BudgetRequestFormLogic } from "./budget-request-form-logic.component";

export function BudgetRequestListForm({
  className,
  children,
  sx,
  label = "A sua experiência de viagem personalizada é aqui",
  heading = "Realize seu orçamento",
  cta,
  ...props
}: BudgetRequestListFormProps) {
  const cn = cx("budget-request-list-form", className, css(sx));
  return (
    <Card className={cn} {...props}>
      <div className="text-center">
        <Text className="budget-request-list-form__label py-xl" size="sm">
          {label}
        </Text>
        <Text as="h3" className="budget-request-list-form__heading pb-xl" variant="heading">
          {heading}
        </Text>
        {children}
      </div>
      <BudgetRequestFormLogic cta={cta} />
    </Card>
  );
}
