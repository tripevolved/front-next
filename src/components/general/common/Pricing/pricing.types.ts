import { PictureProps, TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";
import { ButtonProps } from "mars-ds";

export interface PricingProps extends ComponentHTMLProps {
  image?: PictureProps;
  heading?: TextProps;
  features?: TextProps[] | string[];
  cta?: ButtonProps;
  colorSchema?: Record<string, string> ;
  price?: PriceProps;
  label?: TextProps;
};

export interface ColorSchema {
  color?: string;
  background?: string;
  highlight?: string;
  hoverBackground?: string;
}

export interface PriceProps extends ComponentHTMLProps {
  current?: string;
  old?: string;
  description?: TextProps;
}
