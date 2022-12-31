import { ReactElement } from "react";

import {
  Radio,
  RadioProps,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from "@chakra-ui/react";

export interface RadioInputQuestionProps extends RadioGroupProps {
  options: RadioProps[];
  row: boolean;
  value: string | undefined;
}

export const RadioInputQuestion = ({
  row = false,
  options,
  ...props
}: RadioInputQuestionProps): ReactElement => {
  return (
    <RadioGroup {...props} mx={2} colorScheme="primary">
      <Stack direction={row ? "row" : "column"}>
        {options.map((option, key) => (
          <Radio {...option} key={key} />
        ))}
      </Stack>
    </RadioGroup>
  )  
}