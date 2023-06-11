import { makeCn } from "@/utils/helpers/css.helpers";

import { SectionBase as MarsSectionBase, Grid } from "mars-ds";
import { MediaObject } from "@/ui";
import { SectionBaseProps } from "./section-base.types";
import { useMemo } from "react";

export function SectionBase({
  className,
  container,
  sx,
  children,
  tag,
  image,
  heading,
  text,
  cta,
  columns,
  gap,
  growing,
  reversedLastElement,
  ...props
}: SectionBaseProps) {
  const gridProps = { columns, gap, growing, reversedLastElement };
  const cn = makeCn(className, { [`section-base--${container}`]: Boolean(container) })(sx);
  const hasMediaObject = useMemo(
    () => Boolean(tag || image || heading || text || cta),
    [cta, heading, image, tag, text]
  );
  return (
    // @ts-ignore
    <MarsSectionBase className={cn} container={container} {...props}>
      {hasMediaObject ? (
        <MediaObject tag={tag} image={image} heading={heading} text={text} cta={cta} />
      ) : null}
      {columns ? (
        <Grid className="section-grid__columns" {...gridProps}>
          {children}
        </Grid>
      ) : (
        <>{children}</>
      )}
    </MarsSectionBase>
  );
}
