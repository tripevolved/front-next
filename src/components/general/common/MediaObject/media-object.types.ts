import { PictureProps } from "@/components";
import type { ComponentHTMLProps } from "@/types";
import type { ButtonProps, HeadingProps, TextProps } from "mars-ds";

export interface MediaObjectProps extends ComponentHTMLProps {
  image?: string | PictureProps;
  heading?: string | HeadingProps;
  text?: string | TextProps;
  cta?: ButtonProps;
};
