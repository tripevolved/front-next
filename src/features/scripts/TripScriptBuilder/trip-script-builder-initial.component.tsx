import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Button, Grid, Image } from "mars-ds";

const SCRIPT_BUILDER_INIT = {
  title: "Oi! Vamos construir o seu roteiro de viagem?",
  subtitle:
    "As configurações a seguir nos ajudarão a montar a melhor experiência para sua viagem - mas não se preocupe, você poderá alterar o roteiro quando quiser.",
};

export function InitialStep({ onNext }: StepComponentProps) {
  const { title, subtitle } = SCRIPT_BUILDER_INIT;

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/map.svg"} alt="target" width={64} height={64} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      <Button className="trip-script-builder-step__item" onClick={() => onNext()}>Começar</Button>
    </Grid>
  );
}
