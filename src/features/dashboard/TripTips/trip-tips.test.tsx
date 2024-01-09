import type { TripTipsProps } from "./trip-tips.types";
import { render } from "@testing-library/react";
import { TripTips } from "./trip-tips.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: TripTipsProps) => render(<TripTips {...props} />);

describe("<TripTips>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
