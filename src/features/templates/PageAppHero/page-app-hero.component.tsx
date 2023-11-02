import type { Photo } from "@/core/types";
import { Carousel, Picture, Text } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Container } from "mars-ds";

export interface PageAppHeroProps {
  photos?: Photo[];
  title?: string;
}

export const PageAppHero = ({ photos, title }: PageAppHeroProps) => {
  if (!photos || photos.length === 0) return null;

  const Content = () => {
    if (!title) return null;
    return (
      <Container container="lg" className="page-app-hero__content">
        <Text size="xl" heading>{title}</Text>
      </Container>
    );
  };

  if (photos.length === 1) {
    const image = parsePhoto(photos[0]);
    return (
      <div className="page-app-hero">
        <Picture className="page-app-hero__photo">{image}</Picture>
        <Content />
      </div>
    );
  }
  return (
    <div className="page-app-hero">
      <Carousel className="page-app-hero__carousel">
        {photos.map((photo, i) => (
          <Picture className="page-app-hero__photo" key={i}>
            {parsePhoto(photo) ?? undefined}
          </Picture>
        ))}
      </Carousel>
      <Content />
    </div>
  );
};
