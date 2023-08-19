import type { ComponentHTMLProps } from "@/core/types";
import type { PictureProps } from "@/ui";

export interface CardTripProps extends ComponentHTMLProps {
  status?: string;
  title?: string;
  href?: string;
  image?: string | PictureProps;
}
