import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { NumberInputQuestion } from "@/components/onbording/number-input-question";

describe("NumberInputQuestion test suit", () => {
  it("Changing the value", () => {
    const value = 14;

    render(<NumberInputQuestion data-testid="numberInput" />);

    const numberInput = screen.getByTestId("numberInput");

    userEvent.type(numberInput, `${value}`);


  });
});
