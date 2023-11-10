import type { CardDestinationProps } from "./card-destination.types";
import { render } from "@testing-library/react";
import { CardDestination } from "./card-destination.component";

const FAKE_PROPS: CardDestinationProps = {
  cityImageURL: "fake_image_url.jpg",
  cityName: "fake_city_name",
  matchRate: 1,
};

const makeSut = (props?: CardDestinationProps) =>
  render(<CardDestination {...FAKE_PROPS} {...props} />);

describe("<CardDestination>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
