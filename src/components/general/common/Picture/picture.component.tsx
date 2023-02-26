import classNames from "classnames";
import { useMemo } from "react";

import { parseImageSources } from "./picture.helpers";
import { ImageSourceProps, PictureComponentProps } from "./picture.types";

import css from "./picture.module.scss";

export const TESTID = {
  PICTURE: "picture",
  IMAGE: "image",
  SOURCE: "source",
};

export const MEDIA_SIZES = {
  SM: 300,
  MD: 640,
  LG: 920,
  XL: 1440,
};

export function Picture({ children, ...props }: PictureComponentProps) {
  if (typeof children === "string") {
    return <PictureChildren {...props} src={children} />;
  }
  if (typeof children === "object") {
    return <PictureChildren {...children} {...props} />;
  }
  return <PictureChildren {...props} />;
}

const PictureChildren = ({
  className,
  src,
  height,
  width,
  base,
  sm,
  md,
  lg,
  xl,
  title,
  maxHeight,
  alt,
  ...props
}: Omit<PictureComponentProps, "children">) => {
  const images = useMemo(
    () => parseImageSources({ src, base, sm, md, lg, xl }),
    [base, lg, md, sm, src, xl]
  );
  if (Object.values(images).every((value) => !value)) return null;

  const defaultHeight = height || sm?.height || md?.height || lg?.height;
  const defaultWidth = width || sm?.width || md?.width || lg?.width;

  const style = { maxHeight };
  const commonProps = { height: defaultHeight, width: defaultWidth, style };
  const cn = classNames(css.picture, className);

  return (
    <picture data-testid={TESTID.PICTURE} className={cn} {...props}>
      {images.sm && <ImageSource mediaSize={MEDIA_SIZES.SM} {...sm} src={images.sm} />}
      {images.md && <ImageSource mediaSize={MEDIA_SIZES.MD} {...md} src={images.md} />}
      {images.lg && <ImageSource mediaSize={MEDIA_SIZES.LG} {...lg} src={images.lg} />}
      {images.xl && <ImageSource mediaSize={MEDIA_SIZES.XL} {...xl} src={images.xl} />}
      <img data-testid={TESTID.IMAGE} src={images.base} alt={alt || title} {...commonProps} />
    </picture>
  );
};

const ImageSource = ({ src, height, width, media, mediaSize }: ImageSourceProps) => {
  const m = media || `(min-width: ${mediaSize}px)`;
  const style = { maxHeight: height };
  const commonProps = { height, width, style };
  return <source data-testid={TESTID.SOURCE} media={m} srcSet={src} {...commonProps} />;
};
