import type { MatchedDestinationCardProps } from "./matched-destinations-page.types";
import { Box, CardTrip, Picture, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { formatToPercentage } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { useEffect } from "react";
import { Button, Link } from "mars-ds";
import Image from "next/image";

export function MatchedDestinationCard({
  className,
  children,
  sx,
  tripId,
  destinationId,
  matchScore,
  name,
  images,
  travelersNumber = 2,
  uniqueName,
  onChoice,
  ...props
}: MatchedDestinationCardProps) {
  const cn = makeCn("matched-destination-card", className)(sx);

  const [photo] = images && images.length ? images : [];
  const cover = photo ? parsePhoto(photo) : undefined;
  console.log(matchScore);

  const getHeader = () => (matchScore ? (
      <div className="matched-destination-card__header">
        <Image src={"/emoji/target-arrow.png"} alt="target" width={32} height={32}/>
        <Text>
          Match: <strong>{formatToPercentage(matchScore)}</strong>
        </Text>
      </div>
    ) : null
  );

  return (
    <CardTrip image={cover} title={name} subtitle={`Para ${travelersNumber} pessoas`} header={getHeader()} onClick={() => onChoice(destinationId)} className="trip-item">
      <Box className="matched-destination-card__footer">
        <Button onClick={() => onChoice(destinationId)}>Ver detalhes</Button>
      </Box>
    </CardTrip>
  );
}

export function OtherChoiceMatchedDestinationCard({
  className,
  children,
  sx,
  tripId,
  destinationId,
  matchScore,
  name,
  images,
  travelersNumber = 1,
  uniqueName,
  onChoice,
  ...props
}: MatchedDestinationCardProps) {
  const cn = makeCn("other-choice-destination-card", className)(sx);
  const [photo] = images && images.length ? images : [];
  const cover = photo ? parsePhoto(photo) : undefined;

  const getHeader = () => (matchScore ? (
    <div className="matched-destination-card__header">
      <Image src={"/emoji/target-arrow.png"} alt="target" width={32} height={32}/>
      <Text>
        Match: <strong>{formatToPercentage(matchScore)}</strong>
      </Text>
    </div>
  ) : null
);

  return (
    <CardTrip image={cover} title={name} subtitle={`Para ${travelersNumber} pessoas`} header={getHeader()} onClick={() => onChoice(destinationId)} className="trip-item" />
  );
}
