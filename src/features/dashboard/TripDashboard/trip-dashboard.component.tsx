import { Box, Text, Picture } from "@/ui";
import type { TripDashboardProps, TripDashboardItemProps } from "./trip-dashboard.types";
import NextLink from "next/link";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripDashboard({
  className,
  children,
  sx,
  tripDashboard,
  name,
  ...props
}: TripDashboardProps) {
  const cn = makeCn("trip-dashboard", className)(sx);
  const { pedingActions, attractionsNumber, documents, flightAndTickets, tips } = tripDashboard;

  return (
    <Box className={cn} {...props}>
      <Text heading>{name}</Text>
      <Box className="trip-dashboard__box">
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="pending-alert"
            description="Pendências"
            qtd={pedingActions}
            color="#D84848"
            href="#"
          />
          <TripDashboardItem icon="documents" description="Documentos" qtd={documents} href="#" />
        </Box>
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="flight-and-tickets"
            description="Voos e Reservas"
            qtd={flightAndTickets}
            href="#"
          />
          <TripDashboardItem icon="tips" description="Dicas" qtd={tips} href="#" />
        </Box>
        <Box className="trip-dashboard__box__row">
          <TripDashboardItem
            icon="script"
            description="Roteiro"
            qtd={attractionsNumber}
            href="#"
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
