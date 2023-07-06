import type { TripPendingsProps } from "./trip-pendings.types";
import { render } from "@testing-library/react";
import { TripPendings } from "./trip-pendings.component";

const makeSut = (props?: TripPendingsProps) => render(<TripPendings {...props} />);

describe("<TripPendings>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
