import { render } from "@testing-library/react";
import { PrivacyBanner } from "./privacy-banner.component";

const makeSut = () => render(<PrivacyBanner />);

describe("<PrivacyBanner>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
