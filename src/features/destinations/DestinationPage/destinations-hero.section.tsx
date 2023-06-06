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

  return (
    <section className={cn}>
      {cover ? (
        <div className="destination-hero-section__photos">
          <Picture>{cover}</Picture>
        </div>
      ) : null}
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
