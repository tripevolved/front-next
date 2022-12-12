import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo } from "react";
import { ViewportAnimation } from "../viewport-animation";
import { ImageBasicProps, PictureProps, ScreenScale } from "./picture.types";

export const Picture = ({
  src,
  alt,
  height,
  width,
  objectFit,
  base,
  sm,
  md,
  lg,
  style,
  centered,
  enterAnimation,
  ...props
}: PictureProps) => {
  const hasAnySrc = useMemo(
    () => !!src || [base, sm, md, lg].some((prop) => !!prop),
    [base, sm, md, lg, src]
  );

  const baseSrc = (base?.src || src) as string;
  const baseHeight = base?.height || height;
  const baseWidth = base?.width || width;

  const sizeImageProps = useMemo(() => {
    if (!baseHeight || !baseWidth) return { fill: true };
    return { height: baseHeight, width: baseWidth };
  }, [baseHeight, baseWidth]);

  if (!hasAnySrc) return null;

  return (
    <ViewportAnimation enterAnimation={enterAnimation}>
      <Box
        as="picture"
        style={{
          objectFit,
          maxWidth: "100%",
          display: "inline-block",
          ...style,
        }}
        {...props}
      >
        {lg && <Source screen="lg" {...lg} />}
        {md && <Source screen="md" {...md} />}
        {sm && <Source screen="sm" {...sm} />}
        <Image
          style={{ margin: centered ? "auto" : undefined }}
          src={baseSrc}
          alt={alt || ""}
          {...sizeImageProps}
        />
      </Box>
    </ViewportAnimation>
  );
};

const Source = ({ src, height, width, screen }: ImageBasicProps & { screen: ScreenScale }) => {
  if (typeof src !== "string") return null;

  const size = {
    base: 0,
    sm: 30,
    md: 48,
    lg: 62,
  };

  const media = `(min-width: ${size[screen]}em)`;
  return <source srcSet={src} height={height} width={width} media={media} />;
};
