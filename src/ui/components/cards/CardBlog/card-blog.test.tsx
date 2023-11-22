import type { CardBlogProps } from "./card-blog.types";
import { render } from "@testing-library/react";
import { CardBlog } from "./card-blog.component";

const FAKE_PROPS: CardBlogProps = {
  coverImg: "FAKE_URL_IMAGE.jpg",
  postTitle: "FAKE_TITLE",
};

const makeSut = (props?: CardBlogProps) => render(<CardBlog {...FAKE_PROPS} {...props} />);

describe("<CardBlog>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
