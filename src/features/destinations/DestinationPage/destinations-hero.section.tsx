import type { DestinationProps } from "./destination-page.types";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Picture, Text, Carousel } from "@/ui";
import { Container } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos = [] }: DestinationHeroSectionProps) => {
  const cn = makeCn("destination-hero-section", {
    "destination-hero-section--no-photo": Boolean(photos.length == 0),
  })();

  return (
    <section className={cn}>
      {photos.length && photos.length > 1 ? (
        <Carousel className="destination-hero-section__carousel">
          {photos.map((photo, i) => (
            <Picture className="destination-hero-section__carousel__photos" key={i}>{parsePhoto(photo) ?? undefined}</Picture>
          ))}
        </Carousel>
      ) : <Picture className="destination-hero-section__photos">{parsePhoto(photos[0]) ?? undefined}</Picture>}
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
