import type { CardProps } from "mars-ds";
import type { HTMLProps, PropsWithChildren } from "react";

interface CardYoutubeProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  videoId?: string;
  elevation?: CardProps["elevation"];
}

export type { CardYoutubeProps };
