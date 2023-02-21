import { TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";
import { ImageProps } from "mars-ds";

export interface IntroductionCardProps extends ComponentHTMLProps {
  image?: string | ImageProps;
  heading?: TextProps;
  text?: TextProps;
  social?: SocialProps;
}

export interface SocialProps {
  linkedin?: string;
  instagram?: string;
}
