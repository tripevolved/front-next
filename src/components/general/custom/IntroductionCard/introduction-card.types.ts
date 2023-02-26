import { PictureProps, TextProps } from "@/components";
import { ComponentHTMLProps } from "@/types";

export interface IntroductionCardProps extends ComponentHTMLProps {
  image?: PictureProps;
  heading?: TextProps;
  text?: TextProps;
  social?: SocialProps;
}

export interface SocialProps {
  linkedin?: string;
  instagram?: string;
}
