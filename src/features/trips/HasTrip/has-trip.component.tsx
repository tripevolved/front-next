import { Box, DashedDivider, Text } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import type { HasTripProps } from "./has-trip.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { DestinationsCarousel, PageAppBody, TravelerDestinationCard } from "@/features";

export function HasTrip({ trip, tripId, className, children, sx, ...props }: HasTripProps) {
  const cn = makeCn("has-trip", className)(sx);
  return (
    <>
      <PageAppBody>
        <Box className={cn} {...props}>
          <Text variant="heading" className="has-trip__header-title" size="sm">
            Conclua o pagamento e garanta sua viagem
          </Text>
          <Box className="has-trip__trip-area">
            <TravelerDestinationCard tripId={tripId} {...trip.mainChoice} />
          </Box>
          {trip.otherChoices && trip.otherChoices.length > 0 ? (
            <>
              <DashedDivider color="#0ab9ad" style={{ opacity: 0.6 }} />
              <Box className="has-trip__recommendations-area">
                <DestinationsCarousel
                  title="Também recomendamos"
                  recommendedDestinations={trip.otherChoices.map((matchedDestination, i) => {
                    const [image] = matchedDestination.images;
                    return {
                      matchRate: matchedDestination.matchScore * 100,
                      cityName: matchedDestination.name,
                      cityImageURL: image?.sources || image?.title ? parsePhoto(image) : image,
                    };
                  })}
                />
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </PageAppBody>
      {/* <Box className="has-trip__footer">
        <BlogCardCarousel title="As últimas do blog" />
      </Box> */}
    </>
  );
}
