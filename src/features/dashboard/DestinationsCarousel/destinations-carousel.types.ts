import type { ComponentHTMLProps } from "@/core/types";
import { CardDestinationProps } from "@/ui";

export interface DestinationsCarouselProps extends ComponentHTMLProps {
  recommendedDestinations: CardDestinationProps[],
  title: string;
}
