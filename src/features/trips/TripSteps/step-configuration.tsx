import type { StepComponentProps } from "@/features";
import { DatePicker, Text } from "@/ui";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Grid, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";

export function StepConfiguration({ onNext }: StepComponentProps) {
  const [dates, setDates] = useState<(Date | undefined)[]>([]);
  const [maxBudget, setMaxBudget] = useState(4000);
  const [days, setDays] = useState(1);

  const isDisabled = !dates[0] || !dates[1];

  const handleSubmit = async () => {
    onNext({ dates, days, maxBudget });
  };

  return (
    <Grid gap={24}>
      <Text heading size="xs">
        Em qual período pode viajar?
      </Text>
      <DatePicker
        onSelect={({ startDate, endDate, daysAmount }) => {
          setDates([startDate, endDate]);
          setDays(daysAmount);
        }}
      />
      <Text heading size="xs" className="mt-md">
        Até quanto pode gastar ao total?
      </Text>
      <Slider
        name="maxBudget"
        formatter={formatToCurrencyBR}
        min={500}
        max={10000}
        defaultValue={maxBudget}
        onSelect={setMaxBudget}
        step={100}
      />
      <SubmitButton
        className="mt-md"
        // @ts-ignore
        variant="tertiary"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Continuar
      </SubmitButton>
    </Grid>
  );
}
