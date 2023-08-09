import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Grid, ItemButton, LabelThemes, LabelVariants } from "mars-ds";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";

const HAS_PROFILE_TEXT = {
  title: "Descubra nossas recomendações de destinos!",
  subtitle:
    "Vamos fazer algumas perguntas para entender o que você precisa e quer em sua viagem para construir tudo, personalizado para você.",
};

const NO_PROFILE_TEXT = {
  title:
    "Vamos começar descobrindo o seu perfil de viajante. Responda a seguir e descubra nossas recomendações de destinos.",
  subtitle:
    "O perfil do viajante vai te mostrar que além de gostar de praia, você também gosta de agito ou de descanso. Além de gostar de frio, você gosta de belas paisagens e de uma culinária diferenciada. Esses detalhes fazem a viagem ser inesquecível, porque viajar não é só ir para outros lugares, mas vivenciar a experiência é que engrandece a alma e cria memórias.",
};

export function InitialStep({ onNext, goToStepName }: StepComponentProps) {
  const { travelerProfile } = useAppStore((state) => state.travelerState);
  const router = useRouter();

  const { title, subtitle } = travelerProfile ? HAS_PROFILE_TEXT : NO_PROFILE_TEXT;

  return (
    <Grid>
      <Text heading size="sm">
        {title}
      </Text>
      <Text>{subtitle}</Text>
      <Grid>
        <ItemButton
          iconName="compass"
          labelTheme={LabelThemes.Ghost}
          title="Descobrir minha trip"
          onClick={() => travelerProfile ? goToStepName("register-city") : onNext()}
        />
        <ItemButton
          iconName="navigation"
          title="Já sei para onde ir"
          labelVariant={LabelVariants.Default}
          labelTheme={LabelThemes.Ghost}
          // TODO: use href
          onClick={() => router.replace("/app/viagens/criar")}
        />
      </Grid>
    </Grid>
  );
}
