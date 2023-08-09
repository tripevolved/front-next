import type { StepComponentProps } from "@/features";
import { Text } from "@/ui";
import { formatToPlural } from "@/utils/helpers/number.helpers";
import { Grid, Slider, SubmitButton } from "mars-ds";
import { useState } from "react";

const DEFAULT_ADULTS = 2;

export function StepFinish({ onNext }: StepComponentProps) {
  const [submitting, setSubmitting] = useState(false);
  const [adults, setAdults] = useState(DEFAULT_ADULTS);

  const handleSubmit = () => {
    setSubmitting(true);
    const travelers = { adults };
    onNext({ travelers });
  };

  return (
    <Grid gap={24}>
      <div>
        <Text heading size="xs" className="mt-md">
          Quantas pessoas vão viajar?
        </Text>
        <Text className="color-text-secondary mt-sm" size="md">
          (Incluindo você mesmo)
        </Text>
      </div>
      <Slider
        name="adults"
        formatter={formatToPlural("adulto", "adultos")}
        min={1}
        max={4}
        defaultValue={adults}
        onSelect={setAdults}
        step={1}
        disabled={submitting}
      />
      <SubmitButton
        className="mt-md"
        // @ts-ignore
        variant="tertiary"
        disabled={submitting}
        submitting={submitting}
        onClick={handleSubmit}
      >
        Receber minha recomendação
      </SubmitButton>
    </Grid>
  );
}
