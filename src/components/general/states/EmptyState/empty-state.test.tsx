import type { EmptyStateProps } from "./empty-state.types";
import { render } from "@testing-library/react";
import { EmptyState } from "./empty-state.component";

const makeSut = (props?: EmptyStateProps) => render(<EmptyState {...props} />);

describe("<EmptyState>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
