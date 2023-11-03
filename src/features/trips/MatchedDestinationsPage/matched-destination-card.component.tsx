import type { MatchedDestinationCardProps } from "./matched-destinations-page.types";
import { Box, CardTrip, Text } from "@/ui";

import { formatToPercentage } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Button, Grid } from "mars-ds";
import Image from "next/image";

export function MatchedDestinationCard({
  destinationId,
  matchScore,
  name,
  images,
  travelersNumber = 2,
  onChoice,
  seeMore = false,
}: MatchedDestinationCardProps) {
  const [photo] = images && images.length ? images : [];
  const cover = photo ? parsePhoto(photo) : undefined;
  const subtitle = `Para ${travelersNumber} pessoas`;

  const handleClick = () => onChoice(destinationId);

  const Header = () => {
    if (!matchScore) return null;
    return (
      <Grid columns={["auto", "1fr"]} gap={8} className="align-items-end">
        <Image src="/emoji/target-arrow.png" alt="target" width={32} height={32} />
        <Text style={{ margin: 0 }}>
          Match: <strong>{formatToPercentage(matchScore)}</strong>
        </Text>
      </Grid>
    );
  };

  return (
    <CardTrip
      image={cover}
      title={name}
      subtitle={subtitle}
      header={<Header />}
      onClick={handleClick}
      className="matched-destination-card"
    >
      {seeMore ? (
        <Box className="theme-dark">
          <Button variant="neutral" size="sm" isRtl iconName="arrow-right" onClick={handleClick}>
            Ver detalhes
          </Button>
        </Box>
      ) : null}
    </CardTrip>
  );
}
