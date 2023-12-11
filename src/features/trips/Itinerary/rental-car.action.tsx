import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";
import { TripDetailInfo } from "@/features";

import { CardHighlight, Text } from "@/ui";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { Accordion, Skeleton } from "mars-ds";

export const RentalCarAction = (props: ItineraryActionProps) => {
  return (
    <Accordion title={`🌑 ${props?.from.title || "Aluguel de carro"}`} defaultOpen>
      <Skeleton height={170}>
        <div className="pl-lg itinerary__item" style={{ marginLeft: 6 }}>
          <TripDetailInfo image={`/assets/destino/carro.svg`} title="Aluguel de Carro">
            <Text style={{ color: "var(--color-gray-1)" }}>
              Sua rota iniciará em {props.from.title} até serguirá até {props.to.title}
            </Text>
            <CardHighlight
              variant="default"
              heading="Esta parte do trajeto será feita por terra"
              text="Gostaria de alugar um veículo com nossa equipe?"
              cta={{
                href: getWhatsappLink("Preciso alugar um carro para minha trip"),
                label: "Preciso alugar um carro",
                iconName: "whatsapp",
                isRtl: true,
              }}
            />
          </TripDetailInfo>
        </div>
      </Skeleton>
    </Accordion>
  );
};
