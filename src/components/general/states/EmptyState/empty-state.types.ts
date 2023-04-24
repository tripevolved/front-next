import type { ComponentHTMLProps } from "@/types";
import type { PictureProps } from "@/components";

export interface EmptyStateProps extends ComponentHTMLProps {
  text?: string;
  image?: PictureProps;
}
