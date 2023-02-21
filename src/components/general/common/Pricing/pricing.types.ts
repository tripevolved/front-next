import { TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";
import { ButtonProps, ImageProps } from "mars-ds";

export interface PricingProps extends ComponentHTMLProps {
  image?: string | ImageProps;
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
