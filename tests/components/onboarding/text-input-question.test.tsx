import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { TextInputQuestion } from "@/components/onbording/text-input-question";

describe("TextInputQuestion test suit", () => {
  it("Changing the value",  () => {
    const value = "Primeiro valor";

    render(<TextInputQuestion data-testid="textInput" />)

    const textInput = screen.getByTestId("textInput");
 
    userEvent.type(textInput, value);

    expect(screen.findByText(value)).toBeTruthy();
  });
});
