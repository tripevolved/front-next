import { makeClassName } from "@/helpers/classname.helpers";

import { SectionBase as MarsSectionBase, Grid } from "mars-ds";
import { MediaObject } from "@/components";
import { SectionBaseProps } from "./section-base.types";

export function SectionBase({
  className,
  sx,
  children,
  tag,
  image,
  heading,
  text,
  cta,
  columns,
  gap,
  ...props
}: SectionBaseProps) {
  return (
    <MarsSectionBase className={makeClassName(className)(sx)} {...props}>
      <MediaObject tag={tag} image={image} heading={heading} text={text} cta={cta} />
      {columns ? (
        <Grid className="section-grid__columns" columns={columns} gap={gap}>
          {children}
        </Grid>
      ) : (
        <>{children}</>
      )}
    </MarsSectionBase>
  );
}
