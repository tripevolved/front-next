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

type StepCityProps = {
  title: string;
  onSelectCity?: (cityId: string) => void;
  isLoading?: boolean;
};

export function StepCity({ onSelectCity: onSubmit, title, isLoading }: StepCityProps) {
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
    if (typeof onSubmit !== "function") return;
    try {
      setSubmitting(true);
      await onSubmit(cityId);
    } catch (error) {
      setSubmitting(false);
      Notification.error("Não foi possível prosseguir devido à um erro.");
    }
  };

  return (
    <Grid gap={24}>
      <Skeleton active={isLoading}>
        <Text heading size="xs">
          {title}
        </Text>
      </Skeleton>
      <Grid gap={16}>
        <Skeleton active={isLoading}>
          <TextField
            name="search"
            label="Buscar cidade"
            onChange={onSearchChange}
            leftIconButton={{ name: "search" }}
            disabled={submitting}
          />
        </Skeleton>
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
        <Skeleton active={isLoading}>
          <SubmitButton
            submitting={submitting}
            // @ts-ignore
            variant="tertiary"
            disabled={!cityId}
            onClick={handleSubmit}
          >
            Continuar
          </SubmitButton>
        </Skeleton>
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
