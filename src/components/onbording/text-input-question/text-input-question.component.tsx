import { ReactElement } from "react";

import {
  Input as _Input,
  InputProps as _InputProps
} from "@chakra-ui/react";

export interface TextInputQuestionProps extends _InputProps {}

export const TextInputQuestion = ({ ...props }: TextInputQuestionProps): ReactElement => {
  return (
    <>
      <_Input {...props} borderColor="gray.3" type="text" mx={2} />
    </>
  );
};
