import type { MediaObjectProps } from "./media-object.types";

import { Picture, Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Button, ButtonProps, Grid } from "mars-ds";

export function MediaObject({
  className,
  children,
  image,
  heading,
  text,
  cta,
  sx,
  ...props
}: MediaObjectProps) {
  const cn = cx("media-object", className, css(sx));
  return (
    <div className={cn} {...props}>
      <Grid className="media-object__content">
        {image ? (
          <div className="media-object__image">
            <Picture>{image}</Picture>
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
}

const Cta = ({ style, ...props }: ButtonProps) => {
  return (
    <div>
      <Button style={{ minWidth: 230, ...style }} {...props} />
    </div>
  );
};
