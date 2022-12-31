import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { RadioInputQuestion, RadioInputQuestionProps } from "@/components/onbording/radio-input-question";

describe("RadioInputQuestion test suit", () => {
  const props: RadioInputQuestionProps = {};
  
  it("The input must be checked", () => {
    /**
     * @obs invalid test
     */
    props.value = '';
    props.options = [
      {
        value: '1',
        children: "Primeiro Valor"
      }
    ];

    const handleChange = (input: string) => {
      props.value = input;
    }

    render(
      <RadioInputQuestion
      onChange={handleChange}
      aria-label="radioInput"
      {...props}
      />
    );

    const radioGroup = screen.getByRole("radiogroup");
    
    //userEvent.click(radioGroup);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});