import { Box, Text } from "@/ui";
import type { TripDashboardProps, TripDashboardItemProps } from "./trip-dashboard.types";

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
          <TripDashboardItem />
        </Box>
      </Box>
    </Box>
  );
}

export const TripDashboardItem = ({}: TripDashboardItemProps) => {
  return <Box className="trip-dashboard__box__row__item"></Box>;
};
