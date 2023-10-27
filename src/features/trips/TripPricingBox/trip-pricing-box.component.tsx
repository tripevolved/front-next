import useSWR from "swr";
import { Box, GlobalLoader, Picture, Tag, Text, WhatsappButton } from "@/ui";
import { Button, Divider, Grid, Icon } from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useState } from "react";

interface TripPricingBoxProps {
  destinationName: string;
}

export const TripPricingBox = ({ destinationName }: TripPricingBoxProps) => {
  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : "";

  const [accordion, setAccordion] = useState<boolean>(false);

  const { isLoading, data, error } = useSWR(`trip-pricing/${tripId}`, async () =>
    TripsApiService.getPriceById(tripId)
  );

  if (isLoading || !data || error) {
    return (
      <Grid>
        <Text heading size="xs" as="h2">
          {destinationName}
        </Text>
        {isLoading ? (
          <GlobalLoader inline />
        ) : (
          <>
            <Text>Devido à um erro não foi possível mostrar os preços</Text>
            <Button iconName="refresh-ccw" variant="neutral" onClick={() => location.reload()}>
              Tentar novamente
            </Button>
          </>
        )}
      </Grid>
    );
  }

  return (
    <Grid className="trip-pricing-box">
      <div className="trip-pricing-box__header-container" onClick={() => setAccordion(!accordion)}>
        <div className="trip-pricing-box__header">
          <Text heading size="xs" as="h2">{destinationName}</Text>
          <div className="trip-pricing-box__header__line flex gap-sm align-items-center color-text-secondary">
            <Icon name="users" size="sm" />
            <Text size="sm">Para 2 pessoas</Text>
          </div>
        </div>
        <Icon name="chevron-up" style={{float: "right", paddingLeft: "8px"}} className={`trip-pricing-box__chevron-${accordion ? "active" : "inactive"}`}/>
        <div className="trip-pricing-box__header-price">
          <Text size="sm" heading>{formatToCurrencyBR(data.total)}</Text>
        </div>
      </div>
      <Grid className={accordion ? "trip-pricing-box__content-active" : "trip-pricing-box__content-inactive"}>
        <Box className={`trip-pricing-box__includes ${accordion ? "trip-pricing-box__includes-active" : "trip-pricing-box__includes-inactive"}`}>
          <Text size="lg" className="trip-pricing-box__includes__title">Sua viagem inclui</Text>
          <div className="trip-pricing-box__includes__line">
            <Picture src={"/assets/destino/passagem-aerea.svg"} className="trip-pricing-box__includes__line-item"/>
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">Transporte</Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture src={"/assets/destino/hospedagem.svg"} className="trip-pricing-box__includes__line-item"/>
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">Hospedagem</Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture src={"/assets/destino/roteiro.svg"} className="trip-pricing-box__includes__line-item"/>
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">Roteiro</Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture src={"/assets/destino/dicas-gastronomicas.svg"} className="trip-pricing-box__includes__line-item"/>
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">Dicas gastronômicas</Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture src={"/assets/destino/suporte.svg"} className="trip-pricing-box__includes__line-item"/>
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">Suporte 360°</Text>
          </div>
        </Box>
        <Divider />
        <div className="mb-lg px-md grid text">
          <div className="flex justify-content-between">
            <span>Preço</span>
            <span>{formatToCurrencyBR(data.price)}</span>
          </div>
          <div className="flex justify-content-between">
            <span>Taxa de serviço</span>
            <span>{formatToCurrencyBR(data.serviceFee)}</span>
          </div>
        </div>
        {data?.description && <Text className="color-text-secondary">*{data?.description}</Text>}
        {data.isPaid ? (
          <Tag>A viagem já está paga.</Tag>
        ) : (
          <>
            {/* @ts-ignore */}
            <Button variant="tertiary" href={`/app/viagens/comprar/${tripId}`}>
              Comprar por {formatToCurrencyBR(data.total)}
            </Button>
          </>
        )}
      </Grid>
      <div className={`trip-pricing-box__accordion trip-pricing-box__accordion-${accordion ? "inactive" : "active"}`} onClick={() => setAccordion(!accordion)}>
        <Text style={{color: "var(--color-brand-1)"}} size="lg">Ver o que inclui</Text>
        <Icon name="chevron-down" />
      </div>
    </Grid>
  );
};
