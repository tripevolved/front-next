import type { StepComponentProps } from "@/features";
import { DatePicker, Text } from "@/ui";
import { Grid, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";
import { differenceInDays, max } from "date-fns";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Button, Grid, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";
import { differenceInDays } from "date-fns";

interface StepConfigurationProps extends StepComponentProps {
  budget?: number;
  endDate?: string;
  startDate?: string;
  minExpectedDailyCost?: number;
  maxExpectedDailyCost?: number;
  showPrevious?: boolean;
}

export function StepConfiguration({
  onNext,
  onPrevious,
  endDate,
  budget = 4000,
  startDate,
  showPrevious,
}: StepConfigurationProps) {
export function StepConfiguration({
  onNext,
  endDate,
  startDate,
  minExpectedDailyCost,
  maxExpectedDailyCost,
  budget = 4000,
}: StepConfigurationProps) {
  const defaultDates = [
    startDate ? new Date(startDate) : undefined,
    endDate ? new Date(endDate) : undefined,
  ];

  const defaultDays =
    startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 1;

  const [dates, setDates] = useState<(Date | undefined)[]>(defaultDates);
  const [maxBudget, setMaxBudget] = useState(budget);
  const [days, setDays] = useState(defaultDays);
  const [maxBudget, setMaxBudget] = useState(budget);

  const isDisabled = !dates[0] || !dates[1] || days < 2;

  const handleSubmit = async () =>
    onNext({ dates, days, maxBudget, minExpectedDailyCost, maxExpectedDailyCost });

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

      {minExpectedDailyCost && maxExpectedDailyCost ? (
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
              margin: 0,
              color: "var(--color-brand-2)",
              fontWeight: 600,
            }}
          >
            {formatToCurrencyBR((maxExpectedDailyCost + minExpectedDailyCost) / 2)}
          </Text>
        </div>
      ) : (
        <>
          <Text heading size="xs" className="mt-md">
            Até quanto pode gastar ao total?
          </Text>
          <Slider
            name="maxBudget"
            formatter={formatToCurrencyBR}
            min={500}
            max={50000}
            defaultValue={maxBudget}
            onSelect={setMaxBudget}
            step={500}
          />
        </>
      )}

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
