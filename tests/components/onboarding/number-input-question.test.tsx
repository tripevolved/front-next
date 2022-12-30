import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { NumberInputQuestion } from "@/components/onbording/number-input-question";

describe("NumberInputQuestion test suit", () => {
  it("Changing the value", () => {
    const value = 14;

    render(<NumberInputQuestion data-testid="numberInput" />);

    const numberInput = screen.getByTestId("numberInput");

    userEvent.type(numberInput, `${value}`);

    expect(screen.findByText(value)).toBeTruthy();
  });

  it("The value should be a number type", () => {
    const value = 25;

    render(<NumberInputQuestion aria-label="numberInput" />);

    const numberInput = screen.getByLabelText("numberInput");

    userEvent.type(numberInput, `${value}`);

    const valueToBeVerified = numberInput.value;

    const valueType = typeof(Number(valueToBeVerified));

    expect(valueType).toBe("number");
  });

  it("The value must be a positive value after blur event", () => {
    const value = -2;

    const { getByLabelText } = render(
      <NumberInputQuestion
        aria-label="numberInput"
        positiveValues
      />
    );

    const numberInput = getByLabelText("numberInput");

    fireEvent.change(numberInput, { target: { value: `${value}` } });
    
    fireEvent.blur(numberInput);

    const inputValue = numberInput.value;

    const valueToBeVerified = Number(inputValue) >= 0;

    expect(valueToBeVerified).toBe(true);
  })
});
