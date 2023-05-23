import { ComponentHTMLProps } from "@/core/types";

export interface TagProps extends Omit<ComponentHTMLProps, "children"> {
  children?: ComponentHTMLProps["children"] | TagProps;
}
