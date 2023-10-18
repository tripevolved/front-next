import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Button, Grid, Image } from "mars-ds";
import { useRouter } from "next/router";

const SCRIPT_BUILDER_FINISH = {
  title: "Agora, temos algumas sugestões de restaurantes e bares para enriquecer sua viagem",
  subtitle:
    "Dê like nas opções que mais gostar. Você poderá editar mais tarde.",
};

export function FinishStep({ onNext }: StepComponentProps) {
  const router = useRouter();
  const tripId = String(router.query.id);

  const { title, subtitle } = SCRIPT_BUILDER_FINISH;

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/start-restaurant-flow.svg"} alt="target" width={299} height={158} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      <Button className="trip-script-builder-step__item" onClick={() => onNext()}>Começar a definir restaurantes e bares</Button>
      <Button className="trip-script-builder-step__item" href={`/app/viagens/${tripId}`} variant="naked" size="sm">Deixar para mais tarde</Button>
    </Grid>
  );
}
