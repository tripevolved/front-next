import type { PaymentData, PaymentStepProps } from "./payment-steps.types";

import { Accordion, CardHighlight, EmptyState, ErrorState, Picture, Text } from "@/ui";
import { Button, Card, CardElevations, Checkbox, Divider, Grid, Icon, Link, Skeleton } from "mars-ds";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import { CheckoutAccommodation, CheckoutScript, CheckoutTransportation } from "@/core/types";
import { TripScriptFeatures } from "@/features/trips/TripDetailsPage/trip-script.section";
import { FlightBox } from "@/features/dashboard/ConfirmFlightModal";
import { useIdParam } from "@/utils/hooks/param.hook";
import { TripStayServiceItem } from "@/features/trips/TripStayServiceItem";

export const StepSummary = ({ trip, price, onNext, payload, setPayload }: PaymentStepProps) => {
  const fetcher = async () => TripsApiService.getCheckout(trip.id);
  const { data, isLoading, error } = useSWR(`get-trip-checkout-${trip.id}`, fetcher);

  const TermsLabel = () => (
    <Text size="lg">
      Li e aceito os <strong>Termos e Condições do Serviço</strong>
    </Text>
  );

  if (error) return <ErrorState />;
  if (isLoading) return <StepSummaryLoadingState />;
  if (!data) return <EmptyState />;
  return (
    <Grid>
      <Text heading size="xs" className="mb-sm">
        Resumo da viagem
      </Text>
      <StepSummaryConfiguration title={trip.destination.title} {...trip.configuration} />
      <Text>O que inclui</Text>
      <StepSummaryTransportation {...data.transportation} />
      <StepSummaryAccommodation {...data?.accommodation} />
      <StepSummaryScript {...data?.script} />
      <StepSummarySupport />
      <Divider />
      <StepSummaryPricing {...price} />
      <br />
      <Card elevation={CardElevations.Low} style={{padding: "0 24px"}}>
        <Accordion title={"Termos e condições"} className="color-secondary">
          {/* TODO: add abstract of the terms and conditions */}
          <Link href={"https://www.tripevolved.com.br/termos-de-uso/"} target="_blank">Ver termo completo</Link>
        </Accordion>
      </Card>
      <label className="py-md px-lg">
        <Checkbox
          defaultChecked={payload.acceptTerms}
          onClick={() => setPayload({ acceptTerms: !payload.acceptTerms })}
          label={(<TermsLabel />) as any}
        />
      </label>
      <Button variant="tertiary" onClick={onNext} disabled={!payload.acceptTerms}>
        Continuar
      </Button>
    </Grid>
  );
};

const StepSummaryConfiguration = ({
  formattedDates,
  numAdults,
  title,
}: PaymentStepProps["trip"]["configuration"] & { title: string }) => {
  return (
    <PaymentStepSection image="/assets/trip/destination.svg" title={title}>
      <div className="color-text-secondary flex align-items-center gap-sm">
        <Icon name="calendar" size="sm" />
        <Text>{normalizeDateString(formattedDates)}</Text>
      </div>
      <div className="color-text-secondary flex align-items-center gap-sm">
        <Icon name="users" size="sm" />
        <Text>{numAdults} pessoas</Text>
      </div>
    </PaymentStepSection>
  );
};

const StepSummaryTransportation = (props: CheckoutTransportation) => {
  return (
    <PaymentStepSection image="/assets/transportation/flight.svg" title="Transporte">
      {props.flights?.map((item, i) => (
        <Grid gap={20} key={i}>
          <Text heading size="xs" className="mt-lg">
            Voo de Ida
          </Text>
          {item?.outboundFlight?.flightDetails.map((flight, i) => (
            <FlightBox {...flight} key={i} hideTitle />
          ))}
          <Text heading size="xs" className="mt-lg">
            Voo de Volta
          </Text>
          {item?.returnFlight?.flightDetails.map((flight, i) => (
            <FlightBox {...flight} key={i} hideTitle />
          ))}
        </Grid>
      ))}
      {props.hasTerrestrialRoute ? (
        <CardHighlight
          className="my-md"
          variant="info"
          heading="Rota Terrestre"
          text="Você possui rotas terrestres, mas estas não fazem parte da cobrança."
        />
      ) : null}
    </PaymentStepSection>
  );
};

const StepSummaryAccommodation = (props: CheckoutAccommodation) => {
  const tripId = useIdParam();

  return (
    <PaymentStepSection image="/assets/destino/hospedagem.svg" title="Hospedagem">
      <Grid>
        {props.details?.length ? (
          props.details?.map((accommodation, i) => (
            <div className="flex-column gap-sm" key={i}>
              <Grid columns={["28%", "auto"]}>
                <Picture src={accommodation.coverImageUrl || "/assets/blank-image.png"} />
                <div>
                  <Text as="h3" size="lg">
                    {accommodation.name}
                  </Text>
                  <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>
                    {accommodation.tags}
                  </Text>
                  {accommodation.boardInfo ? (
                    <TripStayServiceItem title={accommodation.boardInfo} type={"breakfast"} />
                  ) : null}
                </div>
              </Grid>

              <div className="w-100 flex-column itinerary-item__content__break">
                <Text style={{ marginTop: 0, color: "var(--color-gray-2)" }}>
                  {accommodation.fullAddress}
                </Text>
              </div>
              {!accommodation.isRoomSelected ? (
                <Text size="sm">{accommodation.roomSelectionMessage}</Text>
              ) : null}
              {accommodation.cancellationInfo ? (
                <CardHighlight
                  variant="info"
                  heading="Informação de Cancelamento"
                  text={accommodation.cancellationInfo}
                />
              ) : null}
            </div>
          ))
        ) : (
          <CardHighlight
            variant="warning"
            heading="Ainda não escolhemos a acomodação para sua viagem"
            text="Podemos escolher com você em um segundo momento e deixar tudo como deseja!"
          />
        )}
      </Grid>
    </PaymentStepSection>
  );
};

const StepSummaryScript = (props: CheckoutScript) => {
  return (
    <PaymentStepSection image="/assets/destino/roteiro.svg" title="Roteiro">
      {props.isFinished ? (
        <>
          <TripScriptFeatures paddingLeft={0} />
          <Text>Você já construiu seu roteiro, mas saiba que poderá alterá-lo se desejar</Text>
        </>
      ) : (
        <CardHighlight
          variant="default"
          heading="Seu roteiro será construído depois"
          text="Sua viagem inclui um roteiro 100% personalizado, que será construído na sequência com a ajuda de nossos especialistas."
        />
      )}
    </PaymentStepSection>
  );
};

const StepSummarySupport = () => {
  return (
    <PaymentStepSection image="/assets/destino/suporte.svg" title="Suporte durante a viagem">
      <Text className="color-text-secondary">
        Para uma experiência única e livre de estresse, oferecemos suporte do início ao fim da sua
        trip, em 360º. Com tudo organizado e planejado, sua preocupação é uma só: curtir a viagem
        dos sonhos!
      </Text>
    </PaymentStepSection>
  );
};

const StepSummaryPricing = ({ price, amount, serviceFee }: PaymentData["price"]) => {
  return (
    <>
      <StepSummaryPricingRow label="Total" value={price} />
      <StepSummaryPricingRow label="Taxa" value={serviceFee} />
      <Divider />
      <StepSummaryPricingRow label="Total Geral" value={amount} />
    </>
  );
};

const StepSummaryPricingRow = ({ label, value }: { label: string; value: number }) => (
  <div className="px-lg flex justify-content-between gap-sm">
    <span>{label}</span>
    <strong>{formatToCurrencyBR(value)}</strong>
  </div>
);

interface PaymentStepSectionProps {
  image: string;
  title: string;
  children: React.ReactNode;
}

const StepSummaryLoadingState = () => {
  return (
    <>
      {[1, 2, 3, 4].map((_, i) => (
        <Skeleton active={true} height={400} className="my-lg" key={i} />
      ))}
    </>
  );
};

const PaymentStepSection = ({ image, title, children }: PaymentStepSectionProps) => {
  return (
    <Grid columns={["36px", 1]}>
      <Picture height={36} width={36} src={image} />
      <div className="pt-xs">
        <Text className="color-primary mb-lg" heading size="xs">
          {title}
        </Text>
        {children}
      </div>
    </Grid>
  );
};