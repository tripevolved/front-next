import type { DestinationProps } from "./destination-page.types";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Picture, Text } from "@/ui";
import { Container } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos = [] }: DestinationHeroSectionProps) => {
  // TODO: Implements carousel
  const [photo] = photos;
  const cover = photo ? parsePhoto(photo) : undefined;
  const cn = makeCn("destination-hero-section", {
    "destination-hero-section--no-photo": !cover,
  })();

  return (
    <section
      className={cn}
    >
      {cover ? <Picture className="destination-hero-section__photos">{cover}</Picture> : null}
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
