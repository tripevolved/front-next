import { Photo } from "@/core/types";
import type { DestinationProps } from "./destination-page.types";

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

  const backgroundImageConfig = cover
    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.86)), url(${cover})`
    : "linear-gradient(to bottom, #1a365d, rgba(0, 0, 0, 0.86))";

  return (
    <section
      className={cn}
      style={{
        backgroundImage: backgroundImageConfig,
      }}
    >
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};

const parseType = (type: string) => {
  return (
    {
      sm: "md",
      md: "lg",
      lg: "xl",
      xl: "xxl",
    }[type] || "md"
  );
};

const parsePhoto = ({ sources = [] }: Photo) =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [parseType(type)]: { src: url, ...props } }),
    {}
  );
