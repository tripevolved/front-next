import { render } from "@testing-library/react";
import { LeadListForm } from "./lead-list-form.component";
import type { LeadListFormProps } from "./lead-list-form.types";

jest.mock("next/router", () => {
  const replace = jest.fn();
  const useRouter = jest.fn().mockReturnValue({ replace });
  return { useRouter };
});

const makeSut = (props?: LeadListFormProps) => render(<LeadListForm {...props} />);

describe("<LeadListForm>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
