import type { PictureProps, TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";

interface ModalContentProps extends ComponentHTMLProps {
  image?: PictureProps;
  heading?: string | TextProps;
  text?: string | TextProps;
}

export type { ModalContentProps };
