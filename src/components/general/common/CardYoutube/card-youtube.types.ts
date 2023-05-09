import type { CardProps } from "mars-ds";
import type { HTMLProps, PropsWithChildren } from "react";

interface tagProps{
  text: string;
  background?: string;
  color?: string;
}

interface CardYoutubeProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  videoId?: string;
  elevation?: CardProps["elevation"];
  tag?: tagProps;
}

export type { CardYoutubeProps };
