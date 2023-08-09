import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";
import { render } from "@testing-library/react";
import { SeeAttractionDetailsModal } from "./see-attraction-details-modal.component";

const makeSut = (props?: SeeAttractionDetailsModalProps) =>
  render(
    <SeeAttractionDetailsModal
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

describe("<SeeAttractionDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
