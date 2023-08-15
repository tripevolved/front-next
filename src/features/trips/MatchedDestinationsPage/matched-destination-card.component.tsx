import type { MatchedDestinationCardProps } from "./matched-destinations-page.types";
import { Box, Picture, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { formatToPercentage } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { useEffect } from "react";
import { Button, Link } from "mars-ds";

export function MatchedDestinationCard({
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
  const cn = makeCn("matched-destination-card", className)(sx);
  let cover;

  useEffect(() => {
    const [photo] = images && images.length ? images : [];
    cover = photo ? parsePhoto(photo) : undefined;
  }, [images]);

  return (
    <Box
      className={cn}
      {...props}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cover}')`,
        backgroundColor: "var(--color-brand-1)",
      }}
    >
      <Box className="matched-destination-card__header">
        {matchScore ? (
          <>
            <Picture width={24} src="/emoji/target-arrow.png" />
            <Text>
              Match: <strong>{formatToPercentage(matchScore)}</strong>
            </Text>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box className="matched-destination-card__footer">
        <Box className="matched-destination-card__footer__city-name">
          <Text variant="heading">{name}</Text>
          <Text>Para {travelersNumber} pessoa(s)</Text>
        </Box>
        <Button onClick={() => onChoice(destinationId)}>Ver detalhes</Button>
      </Box>
    </Box>
  );
}

export function OtherCoiceMatchedDestinationCard({
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
  let cover;

  useEffect(() => {
    const [photo] = images && images.length ? images : [];
    cover = photo ? parsePhoto(photo) : undefined;
  }, [images]);

  return (
    <Link onClick={() => onChoice(destinationId)} className="other-choice-destination-card__link">
      <Box
        className={cn}
        {...props}
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cover}')`,
          backgroundColor: "var(--color-brand-1)",
        }}
      >
        <Box className="other-choice-destination-card__header">
          {matchScore ? (
            <>
              <Picture width={24} src="/emoji/target-arrow.png" />
              <Text>
                Match: <strong>{formatToPercentage(matchScore)}</strong>
              </Text>
            </>
          ) : null}
        </Box>
        <Box className="other-choice-destination-card__footer">
          <Box className="other-choice-destination-card__footer__city-name">
            <Text variant="heading">{name}</Text>
            <Text style={{ color: "var(--color-gray-4", fontWeight: "normal" }}>
              Para {travelersNumber} pessoa(s)
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
