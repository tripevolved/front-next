import type { Photo } from "@/core/types";
import { Carousel, Picture, Text } from "@/ui";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Container, ToggleButton } from "mars-ds";

export interface PageAppHeroProps {
  photos?: Photo[];
  title?: string;
  backUrl?: string;
}

export const PageAppHero = ({ photos, title, backUrl }: PageAppHeroProps) => {
  if (!photos || photos.length === 0) return null;

  const Content = () => {
    if (!title) return null;
    return (
      <div className="page-app-hero__content">
        <Container container="lg" className="page-app-hero__content__container">
          {backUrl ? (
            <ToggleButton
              className="page-app-header__backButton"
              variant="neutral"
              iconName="arrow-left"
              title="Voltar"
              href={backUrl}
            />
          ) : null}
          <Text size="md" heading>
            {title}
          </Text>
        </Container>
      </div>
    );
  };

  if (photos.length === 1) {
    const image = parsePhoto(photos[0]);
    return (
      <div className="page-app-hero">
        <div className="page-app-hero__container">
          <Picture className="page-app-hero__photo">{image}</Picture>
          <Content />
        </div>
      </div>
    );
  }
  return (
    <div className="page-app-hero">
      <Carousel className="page-app-hero__container">
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
