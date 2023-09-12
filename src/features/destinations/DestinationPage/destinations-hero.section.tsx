import type { DestinationProps } from "./destination-page.types";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Picture, Text, Carousel } from "@/ui";
import { Container } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";
import { Photo } from "@/core/types";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos = [] }: DestinationHeroSectionProps) => {
  // TODO: Implements carousel

  const mockPhoto: Photo[] = [
    {
      title: "Primeira Foto",
      sources: [
        {
          url: "https://picsum.photos/1000/500",
          height: 500,
          width: 1000,
          type: "xl",
        },
        {
          url: "https://picsum.photos/900/450",
          height: 450,
          width: 900,
          type: "lg",
        },
      ],
    },
    {
      title: "Segunda Foto",
      sources: [
        {
          url: "https://picsum.photos/1100/550",
          height: 550,
          width: 1100,
          type: "xl",
        },
        {
          url: "https://picsum.photos/1000/500",
          height: 500,
          width: 1000,
          type: "lg",
        },
      ],
    },
  ];

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
      {/* cover ? <Picture className="destination-hero-section__photos">{cover}</Picture> : null */}
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
