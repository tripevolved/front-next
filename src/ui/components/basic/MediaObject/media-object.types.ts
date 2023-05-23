import { PictureProps } from "@/ui";
import type { ComponentHTMLProps } from "@/core/types";
import type { ButtonProps, HeadingProps, TextProps } from "mars-ds";

export interface MediaObjectProps extends ComponentHTMLProps {
  tag?: string;
  image?: PictureProps;
  heading?: string | HeadingProps;
  text?: string | TextProps;
  cta?: ButtonProps;
}
