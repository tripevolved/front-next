import { Photo } from "@/core/types";
import type { DestinationProps } from "./destination-page.types";

import { Picture, Text } from "@/ui";
import { Container } from "mars-ds";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos = [] }: DestinationHeroSectionProps) => {
  // TODO: Implements carousel
  const [photo] = photos;
  const cover = photo ? parsePhoto(photo) : undefined;

  return (
    <section className="destination-hero-section">
      <div className="destination-hero-section__photos">
        <Picture>{cover}</Picture>
      </div>
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};

const parseType = (type: string) => {
  return {
    md: "base",
    lg: "sm",
    xl: "md",
    xxl: "lg"
  }[type] || "lg"
}

const parsePhoto = ({ sources = [] }: Photo) =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [parseType(type)]: { src: url, ...props } }),
    {}
  );
