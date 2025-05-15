import { Box, EmptyState, ErrorState, Text } from "@/ui";
import { delay } from "@/utils/helpers/async.helpers";
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
  onSelectCity?: (cityData: {
    destinationId: string;
    minExpectedDailyCost: number;
    maxExpectedDailyCost: number;
  }) => void;
  isLoading?: boolean;
  fetcher: (
    search: string
  ) => Promise<
    { id: string; name: string; minExpectedDailyCost: number; maxExpectedDailyCost: number }[]
  >;
};

export function StepCity({ onSelectCity: onSubmit, title, isLoading, fetcher }: StepCityProps) {
  const [cityData, setCityData] = useState<{
    cityId: string;
    minExpectedDailyCost: number;
    maxExpectedDailyCost: number;
  } | null>(null);
  const [options, setOptions] = useState<RadioOption[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const debounce = useRef(0);

  function parseCityValue(value?: string) {
    const match = value?.match(/\id-(.+)-min-cost(\d+)-maxcost-(\d+)/);
    if (!match) return null;
    return {
      cityId: match[1],
      minExpectedDailyCost: Number(match[2]),
      maxExpectedDailyCost: Number(match[3]),
    };
  }

  const onSearchChange: React.FormEventHandler<HTMLInputElement> = async (event) => {
    const search = (event.target as HTMLInputElement).value;
    if (search.length < 3) return;
    const time = new Date().getTime();
    debounce.current = time;
    await delay(500);
    if (debounce.current !== time) return;
    try {
      setLoading(true);
      const cities = await fetcher(search);
      const newOptions = cities.map(({ name, id, maxExpectedDailyCost, minExpectedDailyCost }) => ({
        label: name,
        value: `id-${id}-min-cost${minExpectedDailyCost}-maxcost-${maxExpectedDailyCost}`,
      }));
      setOptions(newOptions);
      setEmpty(newOptions.length === 0);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setCityData(null);
    }
  };

  const handleSubmit = async () => {
    if (typeof onSubmit !== "function") return;
    try {
      setSubmitting(true);
      await onSubmit({
        destinationId: cityData?.cityId || "",
        minExpectedDailyCost: cityData?.minExpectedDailyCost || 0,
        maxExpectedDailyCost: cityData?.maxExpectedDailyCost || 0,
      });
    } catch (error) {
      setSubmitting(false);
      Notification.error("Não foi possível prosseguir devido a um erro.");
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
              onSelect={({ value }) => {
                const parsedValue = parseCityValue(String(value));
                setCityData(parsedValue);
              }}
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
            disabled={cityData === null}
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
