import type { ComponentHTMLProps } from "@/core/types";

export interface CardDestinationProps extends ComponentHTMLProps {
  matchRate: number | null;
  cityName: string;
  cityImageURL: {} | null;
}
