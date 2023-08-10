import type { TravelerDestinationCardProps } from "./traveler-destination-card.types";
import { Box, CardTrip, Picture, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Button } from "mars-ds";
import { useEffect } from "react";

export function TravelerDestinationCard({
  className,
  children,
  sx,
  tripId,
  matchScore,
  name,
  images,
  travelersNumber = 1,
  price,
  uniqueName,
  ...props
}: TravelerDestinationCardProps) {
  const cn = makeCn("traveler-destination-card", className)(sx);
  let cover;

  useEffect(() => {
    const [photo] = images && images.length ? images : [];
    cover = photo ? parsePhoto(photo) : undefined;
  }, [images]);

  return (
    <CardTrip className={cn} {...props} image={cover} href={`/app/viagens/criar/${tripId}`}>
      <Box className="traveler-destination-card__header">
        {matchScore ? (
          <>
            <Picture width={24} src="/emoji/target-arrow.png" />
            <Text>
              Match: <strong>{matchScore}%</strong>
            </Text>
          </>
        ) : null}
      </Box>
      <Box className="traveler-destination-card__footer">
        <Box className="traveler-destination-card__footer__city-name">
          <Text variant="heading">{name}</Text>
          <Text>Para {travelersNumber} pessoa(s)</Text>
        </Box>
        {price ? (
          <Text size="xxl" className="traveler-destination-card__footer__price">
            <strong>{formatByDataType(price, "CURRENCY")}</strong>
          </Text>
        ) : null}
      </Box>
    </CardTrip>
  );
}
