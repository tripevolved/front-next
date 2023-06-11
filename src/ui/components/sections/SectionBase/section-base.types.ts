import type { GridProps, SectionBaseProps as MarsSectionBaseProps } from "mars-ds";
import type { MediaObjectProps } from "@/ui";

type Container = "none" | "md" | "lg" | "sm" | "xs";

export interface SectionBaseProps
  extends MediaObjectProps,
    Pick<GridProps, "columns" | "gap" | "growing" | "reversedLastElement"> {
  container?: Container;
  sx?: any;
}
