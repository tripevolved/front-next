import { render } from "@testing-library/react";
import { ChatFloatingButton } from "./chat-floating-button.component";

const makeSut = () => render(<ChatFloatingButton />);

describe("<ChatFloatingButton>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
