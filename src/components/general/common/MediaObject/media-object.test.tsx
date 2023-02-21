import type { MediaObjectProps } from "./media-object.types";

import { render } from "@testing-library/react";

import { MediaObject } from "./media-object.component";

const makeSut = (props?: MediaObjectProps) => render(<MediaObject {...props} />);

describe("<MediaObject>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
