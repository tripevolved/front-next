import { useAppStore } from "@/core/store";
import  type{ TripDiscoverStepContentProps } from "@/features";
import { TripsApiService } from "@/services/api";
import { DatePicker, Text } from "@/ui";
import { formatToCurrencyBR, formatToDayBR } from "@/utils/helpers/number.helpers";
import { Grid, Notification, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";

export function StepConfiguration({ onNext }: TripDiscoverStepContentProps) {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const [submitting, setSubmitting] = useState(false);

  const [dates, setDates] = useState<(Date | undefined)[]>([]);
  const [maxBudget, setMaxBudget] = useState(4000);
  const [days, setDays] = useState(3);

  const isDisabled = !dates[0] || !dates[1];

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await TripsApiService.postCreate({
        dates: dates as [Date, Date],
        maxBudget,
        days,
        travelerId,
        // TODO: bellow data to be filled
        destinationId: "",
        tripBehavior: {},
      });
      onNext();
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  return (
    <Grid gap={24}>
      <Text heading size="xs">
        Em qual período pode viajar?
      </Text>
      <DatePicker onSelect={({ startDate, endDate }) => setDates([startDate, endDate])} />
      <Text heading size="xs">
        Quanto tempo pretende ficar no destino?
      </Text>
      <Slider
        formatter={formatToDayBR}
        name="days"
        min={1}
        max={15}
        defaultValue={days}
        onSelect={setDays}
        step={1}
        disabled={submitting}
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
        disabled={submitting}
      />
      <SubmitButton
        className="mt-md"
        // @ts-ignore
        variant="tertiary"
        disabled={isDisabled}
        onClick={handleSubmit}
        submitting={submitting}
      >
        Continuar
      </SubmitButton>
    </Grid>
  );
}
