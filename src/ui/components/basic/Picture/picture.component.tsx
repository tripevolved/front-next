import { makeCn } from "@/utils/helpers/css.helpers";
import { areChildrenLikeProperty } from "@/utils/helpers/components.helpers";
import { useMemo } from "react";

import { parseImageSources, PICTURE_MEDIA_SIZES, PICTURE_TESTID } from "./picture.helpers";
import { ImageSourceProps, PictureComponentProps } from "./picture.types";

export function Picture({ children, className, sx, ...props }: PictureComponentProps) {
  if (typeof children === "string") {
    return <PictureChildren {...props} src={children} />;
  }
  if (areChildrenLikeProperty(children, "src", "base", "sm", "md", "lg", "xl")) {
    const cn = makeCn(className, children?.className)(sx);
    const allProps = { ...props, ...children, className: cn };
    return <PictureChildren {...allProps} />;
  }
  return <PictureChildren {...props} className={className} sx={sx} />;
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
  xxl,
  title,
  maxHeight,
  alt,
  sx,
  ...props
}: Omit<PictureComponentProps, "children">) => {
  const images = useMemo(
    () => parseImageSources({ src, base, sm, md, lg, xl, xxl }),
    [base, lg, md, sm, src, xl, xxl]
  );

  if (Object.values(images).every((value) => !value)) return null;

  const defaultHeight = height || sm?.height || md?.height || lg?.height;
  const defaultWidth = width || sm?.width || md?.width || lg?.width;

  const style = { maxHeight };
  const commonProps = { height: defaultHeight, width: defaultWidth, style };
  const cn = makeCn("picture", className)(sx);

  return (
    <picture data-testid={PICTURE_TESTID.PICTURE} className={cn} {...props}>
      {images.sm && <ImageSource mediaSize={PICTURE_MEDIA_SIZES.SM} {...sm} src={images.sm} />}
      {images.md && <ImageSource mediaSize={PICTURE_MEDIA_SIZES.MD} {...md} src={images.md} />}
      {images.lg && <ImageSource mediaSize={PICTURE_MEDIA_SIZES.LG} {...lg} src={images.lg} />}
      {images.xl && <ImageSource mediaSize={PICTURE_MEDIA_SIZES.XL} {...xl} src={images.xl} />}
      {images.xxl && <ImageSource mediaSize={PICTURE_MEDIA_SIZES.XXL} {...xxl} src={images.xxl} />}
      <img
        {...commonProps}
        data-testid={PICTURE_TESTID.IMAGE}
        src={images.base}
        alt={alt || title}
      />
    </picture>
  );
};

const ImageSource = ({ src, height, width, media, mediaSize }: ImageSourceProps) => {
  const m = media || `(min-width: ${mediaSize}px)`;
  const style = { maxHeight: height };
  const commonProps = { height, width, style };
  return <source data-testid={PICTURE_TESTID.SOURCE} media={m} srcSet={src} {...commonProps} />;
};
