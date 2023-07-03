import { Box, DashedDivider, Text } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import type { HasTripProps } from "./has-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import {
  BlogCardCarousel,
  DestinationsCarousel,
  TravelerDestinationCard,
} from "@/features";

export function HasTrip({ trip, className, children, sx, ...props }: HasTripProps) {
  const cn = makeCn("has-trip", className)(sx);
  const [photo] = trip.mainChoice.images;
  const cover = photo ? parsePhoto(photo) : null;

  console.log("trip", trip);
  const mainChoiceCardContent = {
    matchRate: trip.mainChoice.matchScore * 100,
    cityName: trip.mainChoice.name,
    cityImageURL: cover,
    travelersNumber: 2, // TODO: receive this from backend
    price: trip.mainChoice.price,
  }

  return (
    <>
      <Box className={cn} {...props}>
        <Text variant="heading" className="has-trip__header-title" size="sm">
          Conclua o pagamento e garanta sua viagem
        </Text>
        <Box className="has-trip__trip-area">
          <TravelerDestinationCard {...mainChoiceCardContent} />
        </Box>
        <DashedDivider color="#0ab9ad" style={{ opacity: 0.6 }} />
        {
          trip.otherChoices && trip.otherChoices.length > 0 ? (
            <Box className="has-trip__recommendations-area">
              <DestinationsCarousel 
                title="Também recomendamos"
                recommendedDestinations={trip.otherChoices.map((matchedDestination, i) => {
                    const [image] = matchedDestination.images;
                    return { matchRate: matchedDestination.matchScore * 100, cityName: matchedDestination.name, cityImageURL: parsePhoto(image) }; 
                  })} />
            </Box>) : <></>
        }
      </Box>
      <Box className="has-trip__footer">
        <BlogCardCarousel title="As últimas do blog" />
      </Box>
    </>
  );
}
