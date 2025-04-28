import type { StepComponentProps } from "@/features";
import { DatePicker, Text } from "@/ui";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Grid, SubmitButton } from "mars-ds";
import { useState } from "react";
import { differenceInDays } from "date-fns";

interface StepConfigurationProps extends StepComponentProps {
  endDate?: string;
  startDate?: string;
}

export function StepConfiguration({ onNext, endDate, startDate }: StepConfigurationProps) {
  const defaultDates = [
    startDate ? new Date(startDate) : undefined,
    endDate ? new Date(endDate) : undefined,
  ];

  const defaultDays =
    startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 1;

  const [dates, setDates] = useState<(Date | undefined)[]>(defaultDates);
  const [days, setDays] = useState(defaultDays);

  const isDisabled = !dates[0] || !dates[1] || days < 2;

  const handleSubmit = async () => onNext({ dates, days });

  return (
    <Grid gap={24}>
      <div>
        <Text heading size="xs">
          Em qual período pode viajar?
        </Text>
        <Text size="sm" className="profile-questions-item__header__caption">
          Selecione ao menos dois dias
        </Text>
      </div>
      <DatePicker
        defaultDates={defaultDates}
        onSelect={({ startDate, endDate, daysAmount }) => {
          setDates([startDate, endDate]);
          setDays(daysAmount);
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Text
          size="xl"
          variant="default"
          style={{
            color: "var(--color-brand-1)",
            fontWeight: 600,
          }}
        >
          Valor médio pela experiência :
        </Text>
        <Text
          size="xl"
          variant="default"
          style={{
            color: "var(--color-brand-2)",
            fontWeight: 600,
          }}
        >
          R$ 4000
        </Text>
      </div>
      <SubmitButton
        className="mt-md"
        variant="tertiary"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Continuar
      </SubmitButton>
    </Grid>
  );
}
