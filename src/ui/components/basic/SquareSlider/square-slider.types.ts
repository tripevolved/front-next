import type { ComponentHTMLProps } from "@/core/types";

export interface SquareSliderProps extends Omit<ComponentHTMLProps, "onSelect"> {
  title?: string;
}
