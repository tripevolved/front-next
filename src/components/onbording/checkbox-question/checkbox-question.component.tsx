import {
  Checkbox,
  CheckboxProps as _CheckboxProps,
  CheckboxGroup,
  CheckboxGroupProps as _CheckboxGroupProps,
  Stack,
} from "@chakra-ui/react";

export interface CheckboxGroupQuestionProps 
  extends _CheckboxGroupProps {
  direction?: "column" | "row";
  options: _CheckboxProps[];
}

export const CheckboxGroupQuestion = ({
  direction = "column",
  options = [],
  ...props
}: CheckboxGroupQuestionProps) => {
  return (
    <CheckboxGroup {...props}>
      <Stack direction={direction}>
        {options.map((item, key) => (
          <Checkbox {...item} key={key} />
        ))}
      </Stack>
    </CheckboxGroup>
  );
}
