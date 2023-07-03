import type { TripAccordeonProps } from "./trip-accordeon.types";
import { render } from "@testing-library/react";
import { TripAccordeon } from "./trip-accordeon.component";
import { TripListView } from "@/core/types";

const mockTest: TripListView = {
  id: "1gh6fd5g84h6d",
  images: [],
  period: "15 dias",
  title: "Ouro Preto",
};

const makeSut = (props?: TripAccordeonProps) =>
  render(<TripAccordeon {...props} trip={mockTest} />);

describe("<TripAccordeon>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
