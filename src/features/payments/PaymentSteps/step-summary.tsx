import type { PaymentStepProps } from "./payment-steps.types";

import { Picture, Text } from "@/ui";
import { Button, Checkbox, Divider, Grid, Icon } from "mars-ds";
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
      <Text heading size="xs" className="mb-sm">
        Resumo da viagem
      </Text>
      <StepSummaryConfiguration title={trip.destination.title} {...trip.configuration} />
      <Text>O que inclui</Text>
      <StepSummaryTransportation />
      <StepSummaryAccommodation />
      <StepSummaryScript />
      <StepSummarySupport />
      <Divider />
      <div className="px-lg flex justify-content-between gap-sm">
        <span>Total</span>
        <strong>R$ 479,90</strong>
      </div>
      <div className="px-lg flex justify-content-between gap-sm">
        <span>Taxa</span>
        <strong>R$ 19,19</strong>
      </div>
      <Divider />
      <div className="px-lg flex justify-content-between gap-sm">
        <span>Total</span>
        <strong>R$ 499,09</strong>
      </div>
      <br />
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
