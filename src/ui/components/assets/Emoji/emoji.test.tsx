import type { EmojiProps } from "./emoji.types";
import { render } from "@testing-library/react";
import { Emoji } from "./emoji.component";

const makeSut = (props?: EmojiProps) => render(<Emoji {...props} />);

describe("<Emoji>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
