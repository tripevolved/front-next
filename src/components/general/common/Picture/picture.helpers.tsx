import { ImageItem } from "./picture.types";

type ParseImageSourcesProps = Partial<{
  src: string;
  base: ImageItem;
  sm: ImageItem;
  md: ImageItem;
  lg: ImageItem;
  xl: ImageItem;
}>;

export const parseImageSources = ({
  src,
  base,
  sm,
  md,
  lg,
  xl,
}: ParseImageSourcesProps) => {
  const defaultSrc = src || base?.src || sm?.src || md?.src || lg?.src || xl?.src;
  return {
    base: defaultSrc,
    sm: sm?.src,
    md: md?.src,
    lg: lg?.src,
    xl: xl?.src,
  };
};

export const PICTURE_TESTID = {
  PICTURE: "picture",
  IMAGE: "image",
  SOURCE: "source",
};

export const PICTURE_MEDIA_SIZES = {
  SM: 300,
  MD: 640,
  LG: 920,
  XL: 1440,
};
