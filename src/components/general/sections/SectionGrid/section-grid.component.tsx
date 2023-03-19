import type { SectionGridProps } from "./section-grid.types";

import { Button, Grid } from "mars-ds";
import { MediaObject, SectionBase, Text } from "@/components";
import { makeCn } from "@/helpers/classname.helpers";

export function SectionGrid({
  className,
  children,
  heading,
  text,
  cta,
  container = "lg",
  columns,
  ...props
}: SectionGridProps) {
  const cn = makeCn(["section-grid", className]);
  return (
    <SectionBase className={cn} {...props}>
      <MediaObject heading={heading} text={text} cta={cta} />
      {text ? <Text>{text}</Text> : null}
      {cta ? <Button {...cta} /> : null}
      <Grid className="section-grid__columns" columns={columns}>{children}</Grid>
    </SectionBase>
  );
}
