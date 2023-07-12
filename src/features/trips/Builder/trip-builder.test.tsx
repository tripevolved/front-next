import type { TripBuilderQuestionsProps } from "./trip-builder.types";
import { render } from "@testing-library/react";
import { TripBuilder } from "./trip-builder.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

const makeSut = (props?: TripBuilderQuestionsProps) => {
  mockUseRouter();
  return render(<TripBuilder {...props} />);
}

describe("<TripBuilder>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
