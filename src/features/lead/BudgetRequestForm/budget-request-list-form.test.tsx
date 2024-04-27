import { render } from "@testing-library/react";
import { BudgetRequestListForm } from "./budget-request-list-form.component";
import type { BudgetRequestListFormProps } from "./budget-request-list-form.types";

jest.mock("next/router", () => {
  const replace = jest.fn();
  const useRouter = jest.fn().mockReturnValue({ replace, query: {} });
  return { useRouter };
});

const makeSut = (props?: BudgetRequestListFormProps) => render(<BudgetRequestListForm {...props} />);

describe("<BudgetRequestListForm>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
