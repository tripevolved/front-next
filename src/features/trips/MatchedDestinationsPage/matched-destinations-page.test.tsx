import { render } from "@testing-library/react";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";
import { MatchedDestinationsPage } from "./matched-destinations-page.component";

const makeSut = () => {
  mockUseRouter();
  return render(<MatchedDestinationsPage />);
}

describe("<MatchedDestinationsPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
