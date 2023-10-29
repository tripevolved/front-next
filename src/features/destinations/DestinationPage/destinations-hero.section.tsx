import type { DestinationProps } from "./destination-page.types";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Picture, Text, Carousel } from "@/ui";
import { Container, ToggleButton } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {
  backButton?: boolean;
  href?: string;
}

export const DestinationHeroSection = ({ title, photos = [], backButton, href }: DestinationHeroSectionProps) => {
  const cn = makeCn("destination-hero-section", {
    "destination-hero-section--no-photo": !photos.length,
  })();

  return (
    <section className={cn}>
      {photos.length && photos.length > 1 ? (
        <Carousel className="destination-hero-section__carousel">
          {photos.map((photo, i) => (
            <Picture className="destination-hero-section__carousel__photos" key={i}>
              {parsePhoto(photo) ?? undefined}
            </Picture>
          ))}
        </Carousel>
      ) : (
        <Picture className="destination-hero-section__photos">
          {photos[0] ? parsePhoto(photos[0]) : undefined}
        </Picture>
      )}
      <Container className="destination-hero-section__content">
        {backButton && (
          <ToggleButton
            size="md"
            iconName="arrow-left"
            href={href}
            className="mr-md theme-dark"
            variant="neutral"
            style={{marginRight: "18px"}}
          />)}
        <Text heading as="span" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
