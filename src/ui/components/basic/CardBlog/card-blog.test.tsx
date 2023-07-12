import type { CardBlogProps } from "./card-blog.types";
import { render } from "@testing-library/react";
import { CardBlog } from "./card-blog.component";

const makeSut = (props?: CardBlogProps) => render(<CardBlog {...props} />);

describe("<CardBlog>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
