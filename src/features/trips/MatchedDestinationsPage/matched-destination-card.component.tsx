import type { MatchedDestinationCardProps } from "./matched-destinations-page.types";

import { formatToPercentage } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Button, Grid } from "mars-ds";
import { CardTrip, Text } from "@/ui";
import Image from "next/image";

export function MatchedDestinationCard({
  matchScore,
  href,
  name,
  images,
  travelersNumber = 2,
  onClick,
  seeMore = false,
}: MatchedDestinationCardProps) {
  const [photo] = images && images.length ? images : [];
  const cover = photo ? parsePhoto(photo) : undefined;
  const subtitle = `Para ${travelersNumber} pessoas`;

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
      href={href}
      onClick={onClick}
      className="matched-destination-card"
    >
      {seeMore ? (
        <div className="theme-dark">
          <Button as="span" variant="neutral" size="sm" isRtl iconName="arrow-right">
            Ver detalhes
          </Button>
        </div>
      ) : null}
    </CardTrip>
  );
}
