import type { PrivacyBannerProps } from "./privacy-banner.types";
import { render } from "@testing-library/react";
import { PrivacyBanner } from "./privacy-banner.component";

const makeSut = (props?: PrivacyBannerProps) => render(<PrivacyBanner {...props} />);

describe("<PrivacyBanner>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
