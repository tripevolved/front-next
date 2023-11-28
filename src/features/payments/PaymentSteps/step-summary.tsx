import type { PaymentData, PaymentStepProps } from "./payment-steps.types";

import { Picture, Text } from "@/ui";
import { Button, Checkbox, Divider, Grid, Icon } from "mars-ds";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";

export const StepSummary = ({ trip, price, onNext, payload, setPayload }: PaymentStepProps) => {
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

const StepSummaryPricingRow = ({ label, value }: { label: string; value: number; }) => (
  <div className="px-lg flex justify-content-between gap-sm">
    <span>{label}</span>
    <strong>{formatToCurrencyBR(value)}</strong>
  </div>
)

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
