import { Text, Picture, CardHighlight } from "@/ui";
import type { TripDashboardProps } from "./trip-dashboard.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Grid } from "mars-ds";
import { TripDashboardCard } from "./trip-dashboard-card.component";

export function TripDashboard({
  className,
  children,
  sx,
  tripDashboard,
  tripId,
  ...props
}: TripDashboardProps) {
  const cn = makeCn("trip-dashboard", className)(sx);
  const { pendingActions, attractionsNumber, status } = tripDashboard;
  const hasWarning = status === "AWAITING_ACTION";
  return (
    <Grid className={cn} {...props}>
      <Text heading>{tripDashboard.name}</Text>
      {hasWarning && <TripDashboardWarning />}
      <Grid>
        <Grid columns={{ xs: 2, lg: 4 }}>
          <TripDashboardCard
            icon="pending-alert"
            description="Pendências"
            qtd={pendingActions}
            color="#D84848"
            href={`/app/viagens/${tripId}/pendencias/`}
          />
          <TripDashboardCard
            icon="documents"
            description="Documentos"
            qtd={0}
            href={`/app/viagens/${tripId}/documentos/`}
          />
          <TripDashboardCard
            icon="flight-and-tickets"
            description="Voos e Reservas"
            qtd={0}
            href={`/app/viagens/${tripId}/reservas/`}
          />
          <TripDashboardCard
            icon="tips"
            description="Dicas"
            qtd={0}
            href={`/app/viagens/${tripId}/dicas/`}
          />
        </Grid>
        <TripDashboardCard
          icon="script"
          description="Roteiro"
          qtd={attractionsNumber}
          href={`/app/viagens/${tripId}/roteiro/`}
          type="script"
        />
      </Grid>
    </Grid>
  );
}

const TripDashboardWarning = () => {
  return (
    <CardHighlight>
      <Grid columns={["auto", "1fr"]} className="align-items-center">
        <Picture src={`/assets/trip-dashboard/pending-alert.svg`} />
        <Text size="lg">
          Sua viagem possui pendências que precisam ser resolvidas para que possamos realizar suas
          reservas.
        </Text>
      </Grid>
    </CardHighlight>
  );
};
