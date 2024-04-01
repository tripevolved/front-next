import type { ComponentHTMLProps, Photo } from "@/core/types";
import { EmblaOptionsType } from "embla-carousel-react";

export interface ThumbnailCarouselProps extends Omit<ComponentHTMLProps, "onSelect"> {
  height?: string | number;
  currentIndex?: number;
  slides: Photo[];
  options: EmblaOptionsType;
}
