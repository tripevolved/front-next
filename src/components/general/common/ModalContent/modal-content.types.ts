import type { TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";
import type { ImageProps } from "mars-ds";

interface ModalContentProps extends ComponentHTMLProps {
  image?: string | ImageProps;
  heading?: string | TextProps;
  text?: string | TextProps;
}

export type { ModalContentProps };
