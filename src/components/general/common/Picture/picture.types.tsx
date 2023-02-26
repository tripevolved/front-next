import type { HTMLAttributes } from "react";

interface ImageSourceProps extends ImageItem {
  media?: string;
  mediaSize?: number;
}

interface ImageItem {
  src?: string;
  height?: string | number;
  width?: string | number;
  disableDarkMode?: boolean;
}

interface ImageItemProps extends ImageItem {
  base?: ImageItem;
  sm?: ImageItem;
  md?: ImageItem;
  lg?: ImageItem;
  xl?: ImageItem;
}

type PictureProps = undefined | string | PictureComponentProps;

interface PictureComponentProps extends Omit<HTMLAttributes<HTMLPictureElement>, "children">, ImageItemProps {
  alt?: string;
  maxHeight?: string | number;
  children?: PictureProps;
}

export type { PictureComponentProps, PictureProps, ImageSourceProps, ImageItem };
