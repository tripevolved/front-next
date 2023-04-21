import { ComponentHTMLProps } from "@/types";

export interface TagProps extends Omit<ComponentHTMLProps, "children"> {
  children?: ComponentHTMLProps["children"] | TagProps;
}
