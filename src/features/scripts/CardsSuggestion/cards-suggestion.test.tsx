import type { CardsSuggestionProps } from "./cards-suggestion.types";
import { render } from "@testing-library/react";
import { CardSuggestion } from "./cards-suggestion.component";

const makeSut = (props?: CardsSuggestionProps) =>
  render(<CardSuggestion {...props} text="Teste" icon="attraction" onClick={() => null} />);

describe("<CardsSuggestion>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
