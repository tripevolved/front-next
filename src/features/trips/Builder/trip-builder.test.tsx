import type { TripBuilderQuestionsProps } from "./trip-builder.types";
import { render } from "@testing-library/react";
import { TripBuilderPage } from "./trip-builder-page.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

const makeSut = (props?: TripBuilderQuestionsProps) => {
  mockUseRouter();
  return render(<TripBuilderPage {...props} />);
}

describe("<TripBuilderPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
