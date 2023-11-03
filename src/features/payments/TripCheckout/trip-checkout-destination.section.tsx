import { TripCheckoutDestinationProps } from "./trip-checkout.types";
import { Box, Picture, Text } from "@/ui";

export const TripDestinationCheckoutSection = ({ configuration, destination, peopleInfo }: TripCheckoutDestinationProps) => {
  return (
    <div className="trip-content-item">
      <Box>
        <Picture src={"/assets/trip/destination.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Destino e datas
        </Text>
        <div>
          <Text size="xl">{destination.title}</Text>
        </div>
        <div><Text size="md">{configuration.dates}</Text></div>
        <div><Text size="md">{peopleInfo}</Text></div>
      </Box>
    </div>
  );
};
