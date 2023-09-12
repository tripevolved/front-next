import type { DestinationProps } from "./destination-page.types";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Picture, Text, Carousel } from "@/ui";
import { Container } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";
import { Photo } from "@/core/types";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos = [] }: DestinationHeroSectionProps) => {

  const getImageList = (imageList: Photo[]): { title: string; src: string, [x: string]: string }[] => {
    // @ts-ignore
    return imageList.flatMap((img) =>
      img.sources.map((src) => ({ src: src.url, title: img.title, ...src }))
    );
  };

  const imgList = getImageList(photos);
  const cn = makeCn("destination-hero-section", {
    "destination-hero-section--no-photo": Boolean(imgList.length),
  })();

  return (
    <section className={cn}>
      {imgList.length ? (
        <Carousel height={250} className="destination-hero-section__photos" style={{ cursor: 'pointer' }}>
          {imgList.map((img, i) => (
            <Picture key={i} {...img} />
          ))}
        </Carousel>
      ) : (
        <Picture className="destination-hero-section__photos">{imgList[0]}</Picture>
      )}
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
