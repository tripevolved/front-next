import type { ShareButtonProps } from "./share-button.types";
import { render } from "@testing-library/react";
import { ShareButton } from "./share-button.component";

const makeSut = (props?: ShareButtonProps) => render(<ShareButton {...props} />);

describe("<ShareButton>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
