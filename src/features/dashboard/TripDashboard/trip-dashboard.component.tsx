import { Box, Text, Picture, CardHighlight } from "@/ui";
import type { TripDashboardProps, TripDashboardItemProps } from "./trip-dashboard.types";
import NextLink from "next/link";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Grid } from "mars-ds";

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

  return (
    <Box className={cn} {...props}>
      <Text heading>{tripDashboard.name}</Text>
      {status === "AWAITING_ACTION" && 
        <CardHighlight className="trip-dashboard__alert">
          <Grid columns={[2,23]}>
          <Picture src={`/assets/trip-dashboard/pending-alert.svg`} className="trip-dashboard__alert__icon" />
          <Text size="lg" className="trip-dashboard__alert__text">
            Sua viagem possui pendências que precisam ser resolvidas para que possamos realizar suas reservas.
          </Text>
          </Grid>
        </CardHighlight>}
      <Box className="trip-dashboard__box">
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="pending-alert"
            description="Pendências"
            qtd={pendingActions}
            color="#D84848"
            href={`/app/viagens/${tripId}/pendencias/`}
          />
          <TripDashboardItem
            icon="documents"
            description="Documentos"
            qtd={0}
            href={`/app/viagens/documentos/${tripId}`}
          />
        </Box>
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="flight-and-tickets"
            description="Voos e Reservas"
            qtd={0}
            href={`/app/viagens/reservas/${tripId}`}
          />
          <TripDashboardItem
            icon="tips"
            description="Dicas"
            qtd={0}
            href={`/app/viagens/dicas/${tripId}`}
          />
        </Box>
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="script"
            description="Roteiro"
            qtd={attractionsNumber}
            href={"/app/viagens/roteiro/" + tripId}
            type="script"
          />
        </Box>
      </Box>
    </Box>
  );
}

export const TripDashboardItem = ({
  href,
  icon,
  description,
  qtd,
  color = "var(--color-brand-2)",
  type = "default",
}: TripDashboardItemProps) => {
  return (
    <NextLink href={href} style={{ textDecoration: "none", width: "100%" }} className="hover">
      <button className="trip-dashboard__box__row__item btn">
        <Box className={`trip-dashboard__box__row__item__container ${type == "script" ? "trip-dashboard__box__row__item__container__script" : ""}`} style={{ color }}>
          <div>
            <Picture src={`/assets/trip-dashboard/${icon}.svg`} />
          </div>
          <Text size="lg" className="trip-dashboard__box__row__item__container__desc">
            {description}
          </Text>
          <Text as="h2" heading size="sm" className="content">
            {type == "default" ? qtd : `${qtd} atrações inclusas`}
          </Text>
        </Box>
      </button>
    </NextLink>
  );
};
