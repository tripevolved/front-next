import { Icon, Grid } from "mars-ds";

import { Box, Text } from "@/ui";
import { ItineraryItemProps } from "./itinerary.types";

export function ItineraryItem({ title, children }: ItineraryItemProps) {
  return (
    <Box className="itinerary-item w-100 flex-column">
      <Grid columns={["20px", "auto"]} className="align-items-center">
        <Icon name="circle" size={"lg"} color="var(--color-brand-2)" />
        <Text heading size="xs">
          {title}
        </Text>
      </Grid>
      <div className="itinerary-item__content w-100 py-md">{children}</div>
    </Box>
  );
}
