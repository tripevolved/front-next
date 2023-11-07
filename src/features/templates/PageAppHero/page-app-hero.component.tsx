import type { Photo } from "@/core/types";

import { Container, ToggleButton } from "mars-ds";
import { Carousel, Picture, Text } from "@/ui";

import { DEFAULT_CARD_IMAGE_URL } from "@/core/constants";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

export interface PageAppHeroProps {
  photos?: Photo[];
  title?: string;
  backUrl?: string;
}

export const PageAppHero = ({ photos, title = "Voltar", backUrl }: PageAppHeroProps) => {
  const Content = () => {
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

  if (!Array.isArray(photos) || !photos.length) {
    return (
      <div className="page-app-hero">
        <div className="page-app-hero__container">
          <Picture className="page-app-hero__photo" src={DEFAULT_CARD_IMAGE_URL} />
          <Content />
        </div>
      </div>
    );
  }

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
            {parsePhoto(photo) || DEFAULT_CARD_IMAGE_URL}
          </Picture>
        ))}
      </Carousel>
      <Content />
    </div>
  );
};
