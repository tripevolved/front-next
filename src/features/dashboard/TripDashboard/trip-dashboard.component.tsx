import { Box, Text, Picture } from "@/ui";
import type { TripDashboardProps, TripDashboardItemProps } from "./trip-dashboard.types";
import NextLink from "next/link";

import { Button as MButton } from "mars-ds";

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
        </Box>
      </Box>
    </Box>
  );
}

export const TripDashboardItem = ({ href, icon, description, qtd }: TripDashboardItemProps) => {
  return (
    <NextLink href={href}>
      <MButton className="trip-dashboard__box__row__item">
        <Box>
          <div>
            <Picture src={`/assets/trip-dashboard/${icon}.svg`} />
          </div>
          <Text>{description}</Text>
          <Text as="h2">{qtd}</Text>
        </Box>
      </MButton>
    </NextLink>
  );
};
