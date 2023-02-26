import type { PictureProps, TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";

interface ModalContentProps extends ComponentHTMLProps {
  image?: PictureProps;
  heading?: string | TextProps;
  text?: string | TextProps;
}

export type { ModalContentProps };
