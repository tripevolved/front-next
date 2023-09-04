import type { ComponentHTMLProps } from "@/core/types";
import type { ButtonProps } from "mars-ds";
import type { PictureProps, TextProps } from "@/ui";

export interface SlideProps extends ComponentHTMLProps {
  overline?: string;
  height?: number | string;
  title?: string | TextProps;
  text?: string;
  buttons?: ButtonProps[];
  backgroundColor?: string;
  color?: string;
  backgroundImage?: PictureProps;
  container?: "full";
}
