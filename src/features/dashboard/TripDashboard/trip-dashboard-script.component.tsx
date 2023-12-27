import { Card, CardElevations, Grid, Link } from "mars-ds";
import { TripDashboardCard } from "./trip-dashboard-card.component";
import { CardHighlight, Picture, Text } from "@/ui";

export const TripDashboardScript = ({
  tripId,
  attractionsNumber,
  isScriptFinished = false
}: { tripId: string, attractionsNumber: number, isScriptFinished: boolean }) => {
  const backToUrl = `/app/viagens/${tripId}`;

  return (
    isScriptFinished ? (
      <TripDashboardCard
        icon="script"
        description="Roteiro"
        qtd={attractionsNumber}
        href={`/app/viagens/${tripId}/roteiro/`}
        type="script"
      />
    ) : (
      <Card
        // @ts-ignore
        as={Link}
        className="trip-dashboard-card"
        href={`/app/viagens/${tripId}/roteiro/configurar/?voltarPara=${backToUrl}`}
        elevation={CardElevations.Low}
        style={{ color: "var(--color-brand-2)" }}
      >
        <Picture src={`/assets/trip-dashboard/script.svg`} />
        <Text size="lg">Roteiro</Text>
        <CardHighlight
          variant="default"
          heading="Vamos construir seu roteiro junto com você"
          text="Recomendando as melhores experiências para o seu perfil e objetivo de viagem!"
          style={{width: "100%"}}
          cta={{
            href: `/app/viagens/${tripId}/roteiro/configurar/?voltarPara=${backToUrl}`,
            label: "Construir meu roteiro",
            iconName: "arrow-right",
            isRtl: true,
          }}
        />
      </Card>
    )
  );
};
