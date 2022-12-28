import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps as _NumberInputProps
} from "@chakra-ui/react";

export interface NumberInputQuestionProps extends _NumberInputProps {
  positiveValues?: boolean;
  placeholder?: string;
}

export const NumberInputQuestion = ({
  positiveValues = false,
  placeholder,
  ...props
}: NumberInputQuestionProps) => {
  return (
    <NumberInput {...props} min={ positiveValues ? 0 : undefined} borderColor="gray.3" mx={2}>
      <NumberInputField placeholder={placeholder}/>
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}