import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid, Image } from "mars-ds";

export function TripScriptBuilderFinalStep({ onNext }: StepComponentProps) {
  const idParam = useIdParam();

  return (
    <Grid className="trip-script-builder-step">
      <Image
        src={"/assets/script/finished-script.svg"}
        alt="target"
        width={299}
        height={158}
        className="trip-script-builder-step__image"
      />
      <Text heading size="sm" className="trip-script-builder-step__item">
        Roteiro criado com sucesso
      </Text>
      <Text className="trip-script-builder-step__item">
        Veja o seu roteiro completo clicando no botão abaixo. Você pode editar quando quiser.
      </Text>
      <Button className="trip-script-builder-step__item" href={`/app/viagens/${idParam}/roteiro`}>
        Ver meu roteiro
      </Button>
    </Grid>
  );
}
