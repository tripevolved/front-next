import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid, Image } from "mars-ds";

export function FinishStep({ onNext }: StepComponentProps) {
  const idParam = useIdParam();

  return (
    <Grid className="trip-script-builder-step">
      <Image
        src={"/assets/script/start-restaurant-flow.svg"}
        alt="target"
        width={299}
        height={158}
        className="trip-script-builder-step__image"
      />
      <Text heading size="sm" className="trip-script-builder-step__item">
        Agora, temos algumas sugestões de restaurantes e bares para enriquecer sua viagem
      </Text>
      <Text className="trip-script-builder-step__item">
        Dê like nas opções que mais gostar. Você poderá editar mais tarde.
      </Text>
      <Button className="trip-script-builder-step__item" onClick={onNext}>
        Começar a definir restaurantes e bares
      </Button>
      <Button
        className="trip-script-builder-step__item"
        href={`/app/viagens/${idParam}`}
        variant="naked"
        size="sm"
      >
        Deixar para mais tarde
      </Button>
    </Grid>
  );
}
