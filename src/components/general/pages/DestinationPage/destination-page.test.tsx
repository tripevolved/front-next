import type { DestinationPageProps } from "./destination-page.types";
import { render } from "@testing-library/react";
import { DestinationPage } from "./destination-page.component";

const makeSut = (props?: DestinationPageProps) => render(<DestinationPage {...props} />);

describe("<DestinationPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
