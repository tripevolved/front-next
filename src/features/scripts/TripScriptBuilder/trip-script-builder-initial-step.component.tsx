import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Button, Grid, Image } from "mars-ds";
import { useRouter } from "next/router";

const SCRIPT_BUILDER_INIT = {
  title: "A seguir, vamos definir as atrações do seu roteiro.",
  subtitle:
    "Não se preocupe: você vai contar com nossas dicas e recomendações ao longo do processo.",
};

export function TripScriptInitialBuildStep({ onNext }: StepComponentProps) {
  const { title, subtitle } = SCRIPT_BUILDER_INIT;

  const router = useRouter();
  const tripId = String(router.query.id);

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/day-mock.svg"} alt="target" width={346} height={166} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      <Button className="trip-script-builder-step__item" onClick={() => onNext()}>Começar a definir as atrações</Button>
      <Button className="trip-script-builder-step__item" href={`/app/viagens/${tripId}`} variant="naked" size="sm">Deixar para mais tarde</Button>
    </Grid>
  );
}
