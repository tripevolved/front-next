import type { StepComponentProps } from "@/features";
import { QuestionOptions } from "@/features";
import { TripScriptsApiService } from "@/services/api";

import { EmptyState, Text } from "@/ui";
import { Button, Grid, Image, Loader } from "mars-ds";

import { useRef } from "react";
import { useRouter } from "next/router";
import useSwr from "swr";
const swrOptions = { revalidateOnFocus: false };

export function TripCharacteristicsStep({ onNext }: StepComponentProps) {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => TripScriptsApiService.getTripCharacteristics(idParam);
  const { data, error, isLoading } = useSwr("trip-characteristics", fetcher, swrOptions);

  const importantCharacteristics = useRef<string | string[]>([]);

  const handleCheck = () => (value: string | string[]) => {
    importantCharacteristics.current = value;
  };

  if (isLoading) {
    return (
      <Grid className="trip-script-builder-step">
        <Loader color="var(--color-brand-1)" size="md" />
      </Grid>
    );
  }

  if (error || !data) {
    return (
      <Grid className="trip-script-builder-step">
        <EmptyState />
      </Grid>
    );
  }

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/trip-characteristics.svg"} alt="target" width={189} height={155} className="trip-script-builder-step__image"/>
      <main className="mb-lg">
        <div>
          <QuestionOptions
            id={"characteristics"}
            title={data.title}
            emoji={""}
            subtitle={""}
            type="CHECKBOX"
            possibleAnswers={data.characteristics.map(value => ({ id: value.id, title: value.name, type: "TEXT", mappingField: null, uniqueName: null }))}
            onCheck={handleCheck()}
          />
        </div>
      </main>
      {data?.subtitle && (<Text className="trip-script-builder-step__item">{data.subtitle}</Text>)}
      <Button
        className="trip-script-builder-step__item"
        onClick={() => onNext({ importantCharacteristics: importantCharacteristics.current })}
      >
        Avançar
      </Button>
    </Grid>
  );
}
