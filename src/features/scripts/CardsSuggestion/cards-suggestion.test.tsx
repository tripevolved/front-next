import type { CardsSuggestionProps } from "./cards-suggestion.types";
import { render } from "@testing-library/react";
import { CardsSuggestion } from "./cards-suggestion.component";

const makeSut = (props?: CardsSuggestionProps) => render(<CardsSuggestion {...props} />);

describe("<CardsSuggestion>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
