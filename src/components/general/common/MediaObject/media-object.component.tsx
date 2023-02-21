import type { MediaObjectProps } from "./media-object.types";

import { Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Button, ButtonProps, Grid, Image } from "mars-ds";

export const MediaObject = ({
  className,
  children,
  image,
  heading,
  text,
  cta,
  sx,
  ...props
}: MediaObjectProps) => {
  const cn = cx("media-object", className, css(sx));
  const imageProps = typeof image === "string" ? { src: image } : image;
  return (
    <div className={cn} {...props}>
      <Grid className="media-object__content">
      {imageProps ? (
        <div className="media-object__image">
          <Image alt="image" {...imageProps}  style={{ display: "inline-block", ...imageProps.style }} />
        </div>
      ) : null}
        {heading ? (
          <Text as="h2" variant="heading">
            {heading}
          </Text>
        ) : null}
        {text ? <Text>{text}</Text> : null}
        {cta ? <Cta {...cta} /> : null}
        {children}
      </Grid>
    </div>
  );
};

const Cta = ({ style, ...props }: ButtonProps) => {
  return (
    <div>
      <Button style={{ minWidth: 230, ...style }} {...props} />
    </div>
  );
};
