import type { ComponentHTMLProps } from "@/types";
import type { ButtonProps, HeadingProps, ImageProps, TextProps } from "mars-ds";

export interface MediaObjectProps extends ComponentHTMLProps {
  image?: string | ImageProps;
  heading?: string | HeadingProps;
  text?: string | TextProps;
  cta?: ButtonProps;
};
