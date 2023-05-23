import type { GridProps, SectionBaseProps as MarsSectionBaseProps } from "mars-ds";
import type { MediaObjectProps } from "@/ui";

export interface SectionBaseProps
  extends MediaObjectProps,
    Pick<GridProps, "columns" | "gap" | "growing" | "reversedLastElement">,
    Pick<MarsSectionBaseProps, "container"> {
  sx?: any;
}
