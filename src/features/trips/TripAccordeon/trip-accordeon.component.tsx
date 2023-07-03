import { Box, Text } from "@/ui";
import type { TripAccordeonProps } from "./trip-accordeon.types";
import { FeatureIcon } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Link } from "mars-ds";

export function TripAccordeon({ className, trip, sx, ...props }: TripAccordeonProps) {
  const cn = makeCn("trip-accordeon", className)(sx);
  const hrefLink = "/app/viagens/" + trip.id;
  const [photo] = trip.images;
  const cover = photo ? parsePhoto(photo) : undefined;

  return (
    <Box className={cn} {...props}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cover}')`,
      }}
    >
      <Link className="trip-accordeon" href={hrefLink}>
        <Box className="trip-accordeon__container">
          <Text className="trip-accordeon__footer__city-name" variant="heading">{trip.title}</Text>
          <Box>
            <FeatureIcon name="calendar" />
            <Text as="h2" size="md" className="trip-accordeon__footer__city-name">
              {trip.period}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
