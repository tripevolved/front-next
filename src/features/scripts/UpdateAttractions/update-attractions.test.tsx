import type { UpdateAttractionsProps } from "./update-attractions.types";
import { render } from "@testing-library/react";
import { UpdateAttractions } from "./update-attractions.component";

const makeSut = (props?: UpdateAttractionsProps) => render(<UpdateAttractions {...props} />);

describe("<UpdateAttractions>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
