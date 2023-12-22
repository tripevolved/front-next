import { CardHighlight } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid, List } from "mars-ds";
import { TripDetailInfo } from "./trip-detail-info.component";

export const TripScriptSection = ({ isBuilt = false }) => (
  <>
    <Grid columns={["1fr", "auto"]}>
      <TripDetailInfo image="/assets/destino/roteiro.svg" title="Roteiro" />
      {isBuilt ? <SeeScriptButton /> : null}
    </Grid>
    {isBuilt ? <TripScriptFeatures /> : <TripScriptBuildCta />}
  </>
);

const SeeScriptButton = () => {
  const idParam = useIdParam();
  return (
    <Button
      variant="naked"
      size="sm"
      iconName="arrow-right"
      isRtl
      href={`/app/viagens/${idParam}/roteiro/previa/`}
    >
      Ver prévia do roteiro
    </Button>
  );
};

export const TripScriptFeatures = ({ paddingLeft = 24 }: { paddingLeft?: number }) => (
  <List
    style={{ paddingLeft }}
    defaultBulletIconName="check"
    list={[
      {
        text: "Seu roteiro com cada experiência pensada para o seu perfil de viajante",
        bulletIconName: "user",
      },
      { text: "O melhor da gastronomia com o que você prefere", bulletIconName: "coffee" },
      {
        text: "Quer curtir? Os melhores bares, festas e eventos à sua disposição",
        bulletIconName: "moon",
      },
    ]}
  />
);

const TripScriptBuildCta = () => {
  const idParam = useIdParam();
  return (
    <CardHighlight
      variant="default"
      heading="Vamos construir seu roteiro junto com você"
      text="Recomendando as melhores experiências para o seu perfil e objetivo de viagem!"
      cta={{
        href: `/app/viagens/${idParam}/roteiro/configurar/`,
        label: "Construir meu roteiro",
        iconName: "arrow-right",
        isRtl: true,
      }}
    />
  );
};
