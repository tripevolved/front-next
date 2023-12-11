import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { CardHighlight } from "@/ui";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";

export const RentalCarAction = (props: ItineraryActionProps) => {
  return (
    <CardHighlight
      variant="warning"
      text="Gostaria de alugar um veículo? Estamos à disposição para te ajudar!"
      cta={{
        href: getWhatsappLink("Preciso alugar um carro para minha trip"),
        label: "Preciso alugar um carro",
        iconName: "whatsapp",
        isRtl: true,
      }}
    />
  );
};
