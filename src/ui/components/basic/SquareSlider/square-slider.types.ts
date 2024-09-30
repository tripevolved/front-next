import type { ComponentHTMLProps } from "@/core/types";

export interface SquareSliderProps extends Omit<ComponentHTMLProps, "onSelect"> {
  title?: string;
  height?: string | number;
  hideDots?: boolean;
  onSelect?: (index: number) => void;
  currentIndex?: number;
}
