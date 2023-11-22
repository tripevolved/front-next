import type { PaymentStepProps } from "./payment-steps.types";

import { CardTrip, Picture, Text } from "@/ui";
import { Button, Checkbox, Grid } from "mars-ds";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import { useState } from "react";

export const StepSummary = ({ trip, onNext }: PaymentStepProps) => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const TermsLabel = () => (
    <Text size="lg">
      Li e aceito os <strong>Termos e Condições do Serviço</strong>
    </Text>
  );

  return (
    <Grid>
      <Text heading size="xs">
        <strong>Resumo da sua viagem:</strong>
      </Text>
      <div className="py-md">
        <CardTrip image={parsePhoto(trip.destination.photos[0])} />
      </div>
      <StepSummaryConfiguration title={trip.destination.title} {...trip.configuration} />
      <StepSummaryTransportation />
      <StepSummaryAccommodation />
      <StepSummaryScript />
      <StepSummarySupport />
      <label className="py-md px-lg">
        <Checkbox
          onClick={() => setAcceptTerms((state) => !state)}
          label={(<TermsLabel />) as any}
        />
      </label>
      <Button variant="tertiary" onClick={onNext} disabled={!acceptTerms}>
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
      <Text className="color-text-secondary" style={{ marginTop: 0 }}>
        {normalizeDateString(formattedDates)}
      </Text>
      <Text className="color-text-secondary" style={{ marginTop: 0 }}>
        {numAdults} pessoas
      </Text>
    </PaymentStepSection>
  );
};

const StepSummaryTransportation = () => {
  return (
    <PaymentStepSection image="/assets/transportation/flight.svg" title="Transporte">
      <Text className="color-text-secondary" style={{ marginTop: 0 }}>
        @todo: adicionar dados
      </Text>
    </PaymentStepSection>
  );
};

const StepSummaryAccommodation = () => {
  return (
    <PaymentStepSection image="/assets/destino/hospedagem.svg" title="Hospedagem">
      <Text className="color-text-secondary" style={{ marginTop: 0 }}>
        @todo: adicionar dados
      </Text>
    </PaymentStepSection>
  );
};

const StepSummaryScript = () => {
  return (
    <PaymentStepSection image="/assets/destino/roteiro.svg" title="Roteiro">
      <Text className="color-text-secondary" style={{ marginTop: 0 }}>
        @todo: adicionar dados
      </Text>
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
