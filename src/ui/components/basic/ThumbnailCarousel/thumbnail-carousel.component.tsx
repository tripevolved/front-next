import useEmblaCarousel from "embla-carousel-react";
import type { ThumbnailCarouselProps } from "./thumbnail-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useCallback, useEffect, useState } from "react";
import { Picture } from "../Picture";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Photo } from "@/core/types";
import { Icon, ToggleButton } from "mars-ds";

export function ThumbnailCarousel({
  className,
  children,
  sx,
  slides,
  options,
  height,
  ...props
}: ThumbnailCarouselProps) {
  const cn = makeCn("thumbnail-carousel", className)(sx);
  const [fullViewImage, setFullViewImage] = useState<Photo | null>(null);
  const [activeViewImage, setActiveViewImage] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const onCloseFullViewImage = () => {
    setActiveViewImage(false);
    setFullViewImage(null);
  };

  const handleImageClick = (image: Photo) => {
    setFullViewImage(image);
    setActiveViewImage(true);
  };

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={cn} {...props}>
      <FullViewImage
        content={fullViewImage}
        active={activeViewImage}
        onClose={() => onCloseFullViewImage()}
      />
      <div className="thumbnail-carousel__viewport" ref={emblaMainRef}>
        <div className="thumbnail-carousel__container">
          {slides.map((content, i) => (
            <Picture
              className="thumbnail-carousel__container__slide"
              key={i}
              onClick={() => handleImageClick(content)}
            >
              {parsePhoto(content)}
            </Picture>
          ))}
        </div>
      </div>
      <div className="carousel-thumbs">
        <div className="carousel-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="carousel-thumbs__viewport__container">
            {slides.map((content, i) => (
              <Picture
                key={i}
                onClick={() => onThumbClick(i)}
                style={{
                  border: i === selectedIndex ? "2px solid var(--color-brand-1)" : undefined,
                }}
                className="carousel-thumbs__viewport__container__slide"
              >
                {parsePhoto(content)}
              </Picture>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FullViewImage = ({
  active,
  content,
  onClose,
}: {
  active: boolean;
  content: Photo | null;
  onClose: VoidFunction;
}) => (
  <div className={`thumbnail-fullview${active ? "--active" : ""}`}>
    <div className="flex-column">
      <ToggleButton
        iconName="x"
        className="m-md"
        onClick={() => onClose()}
        style={{ alignSelf: "end", color: "var(--color-brand-1)" }}
      />
      <Picture className="thumbnail-fullview__image">
        {/** @ts-ignore */}
        {content ? parsePhoto(content) : null}
      </Picture>
    </div>
  </div>
);
