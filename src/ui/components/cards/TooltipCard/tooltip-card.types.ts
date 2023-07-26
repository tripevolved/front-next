import type { ComponentHTMLProps } from "@/core/types";

export interface TooltipCardProps extends ComponentHTMLProps {
  title?: string;
  text: string;
}
