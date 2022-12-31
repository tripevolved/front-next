import {
  Select,
  SelectProps as _SelectProps,
} from "@chakra-ui/react";

export interface SelectQuestionProps extends _SelectProps {
  options: OptionProps[];
}

interface OptionProps {
  value: string | number;
  children: string;
  disabled?: boolean;
}

export const SelectQuestion = ({ options, ...props }: SelectQuestionProps) => {
  return (
    <Select {...props} mx={2}>
      {options.map((option, key) => (
        <option {...option} key={key}>
          {option.children}
        </option>
      ))}
    </Select>
  );
}