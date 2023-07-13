import type { DestinationsByProfileNameProps } from "./destinations-by-profile-name.types";
import { render } from "@testing-library/react";
import { DestinationsByProfileName } from "./destinations-by-profile-name.component";

const makeSut = (props?: DestinationsByProfileNameProps) => render(<DestinationsByProfileName profileName="relax" {...props} />);

describe("<DestinationsByProfileName>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
