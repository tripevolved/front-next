import type { AddAttractionCardProps } from "./add-attraction-card.types";
import { render } from "@testing-library/react";
import { AddAttractionCard } from "./add-attraction-card.component";

const makeSut = (props?: AddAttractionCardProps) => render(<AddAttractionCard {...props} />);

describe("<AddAttractionCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
