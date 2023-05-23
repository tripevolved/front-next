import type { ComponentHTMLProps } from "@/core/types";
import type { PictureProps } from "@/ui";

export interface EmptyStateProps extends ComponentHTMLProps {
  text?: string;
  image?: PictureProps;
}
