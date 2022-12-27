import { cleanup, fireEvent, render } from "@testing-library/react";

import { TextInputQuestion } from "@/components/onbording/text-input-question";
import { afterEach, it } from "node:test";

afterEach(cleanup);

it("TextInputQuestion chenges after enter text", () => {
  const { queryByLabelText, getByLabelText } = render(
    <TextInputQuestion />,
  )
});
