import { Box, DashedDivider, Text } from "@/ui";
import type { HasTripProps } from "./has-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import {
  BlogCardCarousel,
  DestinationsCarousel,
  TravelerDestinationCard,
  TravelerDestinationCardProps,
} from "@/features";

const travelCardContent: TravelerDestinationCardProps = {
  matchRate: 98,
  cityName: "Ouro Preto",
  cityImageURL: "https://fakeimg.pl/300/?text=Outro Preto",
  travelersNumber: 2,
  price: 3437.0,
};

export function HasTrip({ trip, className, children, sx, ...props }: HasTripProps) {
  const cn = makeCn("has-trip", className)(sx);

  return (
    <>
      <Box className={cn} {...props}>
        <Text variant="heading" className="has-trip__header-title" size="sm">
          Conclua o pagamento e garanta sua viagem
        </Text>
        <Box className="has-trip__trip-area">
          <TravelerDestinationCard {...travelCardContent} />
        </Box>
        <DashedDivider color="#0ab9ad" style={{ opacity: 0.6 }} />
        <Box className="has-trip__recommendations-area">
          <DestinationsCarousel title="Também recomendamos" />
        </Box>
      </Box>
      <Box className="has-trip__footer">
        <BlogCardCarousel title="As últimas do blog" />
      </Box>
    </>
  );
}
