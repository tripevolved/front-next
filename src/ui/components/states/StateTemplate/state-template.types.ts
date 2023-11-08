import type { ComponentHTMLProps } from "@/core/types";
import type { PictureProps } from "@/ui";

export interface StateTemplateProps extends ComponentHTMLProps {
  heading?: string;
  text?: string;
  image?: PictureProps;
  retry?: boolean;
}
