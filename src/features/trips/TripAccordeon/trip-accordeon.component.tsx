import { Box, Text } from "@/ui";
import type { TripAccordeonProps } from "./trip-accordeon.types";
import { FeatureIcon } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Link } from "mars-ds";
import { useEffect } from "react";

export function TripAccordeon({ className, trip, sx, ...props }: TripAccordeonProps) {
  const cn = makeCn("trip-accordeon", className)(sx);
  const hrefLink = "/app/viagens/" + trip.id;
  let cover: any = { xxl: { src: "" } };

  useEffect(() => {
    const [photo] = trip.images.length ? trip.images : [];
    cover = photo ? parsePhoto(photo) : undefined;
  }, [trip.images]);

  return (
    <Box
      className={cn}
      {...props}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cover.xxl.src}')`,
        backgroundColor: "var(--color-brand-1)",
      }}
    >
      <Link href={hrefLink} style={{ height: "100%", width: "100%", textDecoration: "none" }}>
        <Box className="trip-accordeon__container">
          <Text className="trip-accordeon__container__header-text" variant="heading">
            {trip.title}
          </Text>
          <Box className="trip-accordeon__container__footer">
            <FeatureIcon name="calendar" size={20} />
            <Text as="h2" size="lg" className="trip-accordeon__container__footer__city-name">
              {trip.period}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
