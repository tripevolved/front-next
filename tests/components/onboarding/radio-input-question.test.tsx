import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { RadioInputQuestion, RadioInputQuestionProps } from "@/components/onbording/radio-input-question";

describe("RadioInputQuestion test suit", () => {
  const props: RadioInputQuestionProps = {};

  it("The input must be checked", () => {
    props.value = '';
    props.options = [
      {
        value: '1',
        children: "Primeiro Valor"
      }
    ];

    render(
      <RadioInputQuestion
        {...props}
        aria-label="radioInput"
      />
    );

    const radioGroup = screen.getByRole("radiogroup");
    
    userEvent.click(radioGroup);

   const radioInput = screen.getByDisplayValue('1');

   console.log("TESTE", radioInput.checked)

    expect(radioInput.value).toBe('1');
  });
});