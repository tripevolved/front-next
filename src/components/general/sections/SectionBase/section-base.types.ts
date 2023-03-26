import type { GridProps, SectionBaseProps as MarsSectionBaseProps } from "mars-ds";
import type { MediaObjectProps } from "@/components";

export interface SectionBaseProps
  extends MediaObjectProps,
    Pick<GridProps, "columns" | "gap">,
    Pick<MarsSectionBaseProps, "container"> {
  sx?: any;
}
