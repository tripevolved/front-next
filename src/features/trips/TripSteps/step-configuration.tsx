import type { StepComponentProps } from "@/features";
import { DatePicker, Text } from "@/ui";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { Button, Grid, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";
import { differenceInDays } from "date-fns";

interface StepConfigurationProps extends StepComponentProps {
  budget?: number;
  endDate?: string;
  startDate?: string;
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
  const defaultDates = [
    startDate ? new Date(startDate) : undefined,
    endDate ? new Date(endDate) : undefined,
  ];

  const defaultDays =
    startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 1;

  const [dates, setDates] = useState<(Date | undefined)[]>(defaultDates);
  const [maxBudget, setMaxBudget] = useState(budget);
  const [days, setDays] = useState(defaultDays);

  const isDisabled = !dates[0] || !dates[1] || days < 2;

  const handleSubmit = async () => onNext({ dates, days, maxBudget });

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

      <div className="mt-md profile-questions-navigation">
        {showPrevious && (
          <Button
            onClick={onPrevious}
            iconName="chevron-left"
            variant="neutral"
            className="profile-questions-navigation__previous"
          >
            Anterior
          </Button>
        )}

        <SubmitButton
          variant="tertiary"
          disabled={isDisabled}
          onClick={handleSubmit}
          className="profile-questions-navigation__next"
        >
          Continuar
        </SubmitButton>
      </div>
    </Grid>
  );
}
