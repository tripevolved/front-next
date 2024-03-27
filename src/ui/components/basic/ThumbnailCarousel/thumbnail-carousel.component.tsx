import useEmblaCarousel from "embla-carousel-react";
import type { ThumbnailCarouselProps } from "./thumbnail-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useCallback, useEffect, useState } from "react";
import { Picture } from "../Picture";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

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

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={cn} {...props}>
      <div className="thumbnail-carousel__viewport" ref={emblaMainRef}>
        <div className="thumbnail-carousel__container">
          {slides.map((content, i) => (
            <Picture className="thumbnail-carousel__container__slide" key={i}>
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
