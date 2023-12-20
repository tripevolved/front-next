import type { PaymentData, PaymentStepProps } from "./payment-steps.types";

import { CardHighlight, EmptyState, ErrorState, Picture, Text } from "@/ui";
import { Button, Checkbox, Divider, Grid, Icon } from "mars-ds";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import {
  CheckoutAccommodation,
  CheckoutScript,
  CheckoutTransportation,
  TripTransportation,
} from "@/core/types";
import { TripScriptFeatures } from "@/features/trips/TripDetailsPage/trip-script.section";
import { FlightBox } from "@/features/dashboard/ConfirmFlightModal";

export const StepSummary = ({ trip, price, onNext, payload, setPayload }: PaymentStepProps) => {
  const fetcher = async () => TripsApiService.getCheckout(trip.id);
  const { data, isLoading, error } = useSWR(`get-trip-checkout-${trip.id}`, fetcher);

  const TermsLabel = () => (
    <Text size="lg">
      Li e aceito os <strong>Termos e Condições do Serviço</strong>
    </Text>
  );

  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

  console.log("informações", data);
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
  const getFlight = (data: TripTransportation) => {
    const fromCode = data.fromName?.split("-")[0].trim();
    const outboundFlight =
      data.flightView.outboundFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode
      ) || null;

    const returnFlight =
      data.flightView.returnFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode
      ) || null;

    return outboundFlight || returnFlight;
  };

  return (
    <PaymentStepSection image="/assets/transportation/flight.svg" title="Transporte">
      {props.details.map((item, i) => (
        <FlightBox
          {...getFlight({ ...item, flightView: item.flight } as TripTransportation)}
          hideTitle
          key={i}
        />
      ))}
    </PaymentStepSection>
  );
};

const StepSummaryAccommodation = (props: CheckoutAccommodation) => {
  return (
    <PaymentStepSection image="/assets/destino/hospedagem.svg" title="Hospedagem">
      <Grid className="pl-lg">
        {props.details.map((accommodation, i) => (
          <Grid columns={["56px", "auto"]} key={i}>
            <Picture src={accommodation.coverImageUrl || "/assets/blank-image.png"} />
            <div>
              <div className="w-100 flex-column itinerary-item__content__break">
                <div>
                  <Text as="h3" size="lg">
                    {accommodation.name}
                  </Text>
                  <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>
                    {accommodation.tags}
                  </Text>
                </div>
              </div>
              {!accommodation.isRoomSelected ? (
                <Text size="sm">{accommodation.roomSelectionMessage}</Text>
              ) : null}
            </div>
          </Grid>
        ))}
      </Grid>
    </PaymentStepSection>
  );
};

const StepSummaryScript = (props: CheckoutScript) => {
  return (
    <PaymentStepSection image="/assets/destino/roteiro.svg" title="Roteiro">
      {props.isFinished ? (
        <>
          <TripScriptFeatures />
          <Text>Você já construiu seu roteiro, mas saiba que podeár alterá-lo se desejar</Text>
        </>
      ) : (
        <CardHighlight
          variant="default"
          heading="Seu roteiro será construído depois"
          text="Não se preocupe. Assim que finalizarmos esta fase você poderá realizar a construção do seu roteiro tranquilamente"
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

const PaymentStepSection = ({ image, title, children }: PaymentStepSectionProps) => {
  return (
    <Grid columns={["4px", "36px", 1]}>
      <span />
      <Picture height={36} width={36} src={image} />
      <div className="pt-xs">
        <Text className="color-primary" heading size="xs">
          {title}
        </Text>
        {children}
      </div>
    </Grid>
  );
};
