import { Box, Text, Picture } from "@/ui";
import type { TripDashboardProps, TripDashboardItemProps } from "./trip-dashboard.types";
import NextLink from "next/link";

import { makeCn } from "@/utils/helpers/css.helpers";
import { PageAppBody } from "@/features";

export function TripDashboard({
  className,
  children,
  sx,
  tripDashboard,
  tripId,
  ...props
}: TripDashboardProps) {
  const cn = makeCn("trip-dashboard", className)(sx);
  const { pendingActions, attractionsNumber, documents, flightAndTickets, tips } = tripDashboard;

  return (
    <PageAppBody>
      <Box className={cn} {...props}>
        <Text heading>{tripDashboard.name}</Text>
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
              qtd={documents}
              href={`/app/viagens/documentos/${tripId}`}
            />
          </Box>
          <Box className="trip-dashboard__box__row">
            <TripDashboardItem
              icon="flight-and-tickets"
              description="Voos e Reservas"
              qtd={flightAndTickets}
              href={`/app/viagens/reservas/${tripId}`}
            />
            <TripDashboardItem
              icon="tips"
              description="Dicas"
              qtd={tips}
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
    </PageAppBody>
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
        <Box className="trip-dashboard__box__row__item__container" style={{ color }}>
          {type == "default" && (
            <>
              <div>
                <Picture src={`/assets/trip-dashboard/${icon}.svg`} />
              </div>
              <Text size="lg" className="trip-dashboard__box__row__item__container__desc">
                {description}
              </Text>
              <Text as="h2" heading size="xxl">
                {qtd}
              </Text>
            </>
          )}
          {type == "script" && (
            <Box className="trip-dashboard__box__row__item__container__script-container">
              <div>
                <Picture src={`/assets/trip-dashboard/${icon}.svg`} />
                <Text size="lg" className="trip-dashboard__box__row__item__container__desc">
                  {description}
                </Text>
              </div>
              <div>
                <Text size="xxl">{qtd} atrações inclusas</Text>
              </div>
            </Box>
          )}
        </Box>
      </button>
    </NextLink>
  );
};
