import type { TripPendingsProps } from "./trip-pendings.types";
import { render } from "@testing-library/react";
import { TripPending } from "./trip-pendings.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: TripPendingsProps) => render(<TripPending {...props} />);

describe("<TripPendings>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
