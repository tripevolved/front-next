import type { ComponentHTMLProps } from "@/core/types";

export interface CarouselProps extends Omit<ComponentHTMLProps, "onSelect"> {
  height?: string | number;
  hideDots?: boolean;
  onSelect?: (index: number) => void;
  currentIndex?: number;
}
