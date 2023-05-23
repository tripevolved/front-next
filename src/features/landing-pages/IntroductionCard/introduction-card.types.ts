import { PictureProps, TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";

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
