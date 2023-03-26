import type { TagProps } from "./tag.types";
import { render } from "@testing-library/react";
import { Tag } from "./tag.component";

const makeSut = (props?: TagProps) => render(<Tag {...props} />);

describe("<Tag>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
