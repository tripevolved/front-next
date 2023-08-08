import type { AddAttractionCardProps } from "./add-attraction-card.types";
import { render } from "@testing-library/react";
import { AddAttractionCard } from "./add-attraction-card.component";

const makeSut = (props?: AddAttractionCardProps) =>
  render(
    <AddAttractionCard
      {...props}
      attraction={{
        id: "h42l34khui34ih",
        address: "Rua da Alegregria, 26, Bairro dos Prazeres",
        availabilityInfo: "O dia todo, das 8h às 20h",
        isAlreadySelected: false,
        isHighlyRecommended: true,
        name: "Lanchonete Sensação",
        purchasePrice: 35.9,
        attractionId: "2lk3j42ih5o2o5jo",
      }}
    />
  );

describe("<AddAttractionCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
