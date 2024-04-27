import { FormLogicProps } from "./budget-request-list-form.types";
import { BudgetRequestForm } from "./budget-request-form.component";

export function BudgetRequestFormLogic({ cta }: FormLogicProps) {
  return (
    <div className="theme-dark p-xl">
      <BudgetRequestForm
        columns={{ lg: [1, 1, "360px"] }}
      />
    </div>
  );
}
