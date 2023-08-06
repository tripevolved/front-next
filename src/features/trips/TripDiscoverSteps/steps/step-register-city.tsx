import { useAppStore } from "@/core/store";
import type { TripDiscoverStepContentProps } from "@/features";
import { RegisterApiService } from "@/services/api";
import { Box, EmptyState, ErrorState, Text } from "@/ui";
import { delay } from "@/utils/helpers/delay.helpers";
import {
  Grid,
  Notification,
  RadioFields,
  RadioOption,
  Skeleton,
  SubmitButton,
  TextField,
  makeArray,
} from "mars-ds";
import { useRef, useState } from "react";

export function StepRegisterCity({ onNext }: TripDiscoverStepContentProps) {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const [cityId, setCityId] = useState("");
  const [options, setOptions] = useState<RadioOption[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const debounce = useRef(0);

  const onSearchChange: React.FormEventHandler<HTMLInputElement> = async (event) => {
    const search = (event.target as HTMLInputElement).value;
    if (search.length < 3) return;
    const time = new Date().getTime();
    debounce.current = time;
    await delay(500);
    if (debounce.current !== time) return;
    try {
      setLoading(true);
      const cities = await RegisterApiService.getCities(search);
      const newOptions = cities.map(({ name, id }) => ({ label: name, value: id }));
      setOptions(newOptions);
      setEmpty(newOptions.length === 0);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setCityId("");
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await RegisterApiService.putRegisterCity({
        cityId,
        travelerId,
      });
      onNext();
    } catch (error) {
      setSubmitting(false);
      Notification.error("Não foi possível salvar a informação devido à um erro.");
    }
  };

  return (
    <Grid gap={24}>
      <Text heading size="xs">
        Em que cidade você mora atualmente?
      </Text>
      <Grid gap={16}>
        <TextField
          name="search"
          label="Buscar cidade"
          onChange={onSearchChange}
          leftIconButton={{ name: "search" }}
          disabled={submitting}
        />
        <Box>
          {error ? (
            <ErrorState />
          ) : empty ? (
            <EmptyState text="Nenhuma cidade encontrada" />
          ) : loading ? (
            <LoadingState />
          ) : (
            <RadioFields
              onSelect={({ value }) => setCityId(value as string)}
              name="city"
              options={options}
            />
          )}
        </Box>
        <SubmitButton
          submitting={submitting}
          // @ts-ignore
          variant="tertiary"
          disabled={!cityId}
          onClick={handleSubmit}
        >
          Continuar
        </SubmitButton>
      </Grid>
    </Grid>
  );
}

const LoadingState = () => {
  return (
    <Grid className="p-md">
      {makeArray(8).map((_, key) => (
        <Grid key={key} columns="16px 1fr">
          <Skeleton active />
          <Skeleton active />
        </Grid>
      ))}
    </Grid>
  );
};
