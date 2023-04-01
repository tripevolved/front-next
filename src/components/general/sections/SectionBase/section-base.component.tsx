import { makeClassName } from "@/helpers/classname.helpers";

import { SectionBase as MarsSectionBase, Grid } from "mars-ds";
import { MediaObject } from "@/components";
import { SectionBaseProps } from "./section-base.types";

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
  const cn = makeClassName(className, { [`section-base--${container}`]: Boolean(container) })(sx);
  return (
    <MarsSectionBase className={cn} container={container} {...props}>
      <MediaObject tag={tag} image={image} heading={heading} text={text} cta={cta} />
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
