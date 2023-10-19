import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Button, Grid, Image } from "mars-ds";
import { useRouter } from "next/router";

const RESTAURANTS_FINISH = {
  title: "Vamos para as opções de bares e festas?",
  subtitle:
    "Como antes, dê like nas opções que mais gostar. Você poderá editar mais tarde.",
};

export function FinishRestaurantsStep({ onNext }: StepComponentProps) {
  const router = useRouter();
  const tripId = String(router.query.id);

  const { title, subtitle } = RESTAURANTS_FINISH;

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/start-restaurant-flow.svg"} alt="target" width={299} height={158} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      <Button className="trip-script-builder-step__item" onClick={() => onNext()} disabled>Começar a definir bares e festas</Button>
      <Button className="trip-script-builder-step__item" href={`/app/viagens/${tripId}`} variant="naked" size="sm">Deixar para mais tarde</Button>
    </Grid>
  );
}
