import { BoxProps } from "@chakra-ui/react";
import { ImageProps } from "next/image";

export type ScreenScale = "base" | "sm" | "md" | "lg";

type Responsive<T> = Record<ScreenScale, T>;

type ImageResponsive = Responsive<ImageBasicProps>;

export interface ImageBasicProps extends Pick<ImageProps, "height" | "width"> {
  src?: string | ImageProps["src"];
}

export interface PictureProps
  extends Partial<ImageResponsive>,
    ImageBasicProps,
    Omit<BoxProps, "height" | "width"> {
  alt?: string;
  objectFit?: "cover" | "contain" | "scale-down";
  centered?: boolean;
}
