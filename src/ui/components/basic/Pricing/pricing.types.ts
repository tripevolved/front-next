import { PictureProps, TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";
import { ButtonProps } from "mars-ds";

export interface PricingProps extends ComponentHTMLProps {
  image?: PictureProps;
  emojiName?: string;
  heading?: TextProps;
  features?: TextProps[] | string[];
  cta?: ButtonProps;
  highlight?: Boolean;
  price?: PriceProps;
  label?: TextProps;
}

export interface PriceProps extends ComponentHTMLProps {
  current?: string;
  old?: string;
  description?: TextProps;
}
