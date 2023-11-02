import useSWR from "swr";
import { Box, GlobalLoader, Picture, Tag, Text } from "@/ui";
import { Button, Divider, Grid, Icon } from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useState } from "react";
import { useIdParam } from "@/utils/hooks/param.hook";

interface TripPricingBoxProps {
  destinationName: string;
  numAdults: number;
  numChildren?: number;
  isScriptBuilt?: boolean;
}

export const TripPricingBox = ({
  destinationName,
  numAdults = 2,
  numChildren,
  isScriptBuilt,
}: TripPricingBoxProps) => {
  const idParam = useIdParam();

  const [accordion, setAccordion] = useState<boolean>(false);

  const fetcherKey = `trip-pricing-${idParam}`;
  const fetcher = async () => TripsApiService.getPriceById(idParam);
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher);

  if (isLoading) return <GlobalLoader />;

  if (error || !data) {
    return (
      <Grid className="trip-pricing-box">
        <Text heading size="xs" as="h2">
          {destinationName}
        </Text>
        <Text>Devido à um erro não foi possível mostrar os preços</Text>
        <Button iconName="refresh-ccw" variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </Grid>
    );
  }

  return (
    <Grid className="trip-pricing-box">
      <div className="trip-pricing-box__header-container" onClick={() => setAccordion(!accordion)}>
        <div className="trip-pricing-box__header">
          <Text heading size="xs" as="h2">
            {destinationName}
          </Text>
          <div className="trip-pricing-box__header__line flex gap-sm align-items-center color-text-secondary">
            <Icon name="users" size="sm" />
            <Text size="sm">Para {numAdults} adultos{numChildren && numChildren > 0 ? ` e ${numChildren} crianças` : ""}</Text>
          </div>
        </div>
        <Icon
          name="chevron-up"
          style={{ float: "right", paddingLeft: "8px" }}
          className={`trip-pricing-box__chevron-${accordion ? "active" : "inactive"}`}
        />
        <div className="trip-pricing-box__header-price">
          <Text size="sm" heading>
            {formatToCurrencyBR(data.total)}
          </Text>
        </div>
      </div>
      <Grid
        className={
          accordion ? "trip-pricing-box__content-active" : "trip-pricing-box__content-inactive"
        }
      >
        <Box
          className={`trip-pricing-box__includes ${
            accordion ? "trip-pricing-box__includes-active" : "trip-pricing-box__includes-inactive"
          }`}
        >
          <Text size="lg" className="trip-pricing-box__includes__title">
            Sua viagem inclui
          </Text>
          <div className="trip-pricing-box__includes__line">
            <Picture
              src={"/assets/destino/passagem-aerea.svg"}
              className="trip-pricing-box__includes__line-item"
            />
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">
              Transporte
            </Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture
              src={"/assets/destino/hospedagem.svg"}
              className="trip-pricing-box__includes__line-item"
            />
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">
              Hospedagem
            </Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture
              src={"/assets/destino/roteiro.svg"}
              className="trip-pricing-box__includes__line-item"
            />
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">
              Roteiro
            </Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture
              src={"/assets/destino/dicas-gastronomicas.svg"}
              className="trip-pricing-box__includes__line-item"
            />
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">
              Dicas gastronômicas
            </Text>
          </div>
          <div className="trip-pricing-box__includes__line">
            <Picture
              src={"/assets/destino/suporte.svg"}
              className="trip-pricing-box__includes__line-item"
            />
            <Text as="p" size="xl" className="trip-pricing-box__includes__line-item">
              Suporte 360°
            </Text>
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
        ) : (isScriptBuilt ? (
            <>
              {/* @ts-ignore */}
              <Button variant="tertiary" href={`/app/viagens/${idParam}/comprar/checkout/`} size="sm">
                Comprar por {formatToCurrencyBR(data.total)}
              </Button>
            </>
          )
          : (
            <>
              {/* @ts-ignore */}
              <Button variant="tertiary" href={`/app/viagens/${idParam}/roteiro/construcao/?voltarPara=${encodeURI(`/app/viagens/${idParam}/comprar/checkout/`)}`}>
                Construir meu roteiro
              </Button>
              <Button variant="secondary" href={`/app/viagens/${idParam}/comprar/checkout/`} size="sm">
                Comprar por {formatToCurrencyBR(data.total)}
              </Button>
              <Text size="sm"><span style={{fontWeight: "bold"}}>Não se preocupe:</span> você poderá construir o roteiro em um momento posterior</Text>
            </>
        ))}
      </Grid>
      <div
        className={`trip-pricing-box__accordion trip-pricing-box__accordion-${
          accordion ? "inactive" : "active"
        }`}
        onClick={() => setAccordion(!accordion)}
      >
        <Text style={{ color: "var(--color-brand-1)" }} size="lg">
          Ver o que inclui
        </Text>
        <Icon name="chevron-down" />
      </div>
    </Grid>
  );
};
