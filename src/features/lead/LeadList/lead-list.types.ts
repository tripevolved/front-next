import type { SectionBaseProps, TextProps } from "@/ui";
import { LinkProps } from "mars-ds";

export interface LeadListProps extends SectionBaseProps {
  heading?: string | TextProps;
  text?: string | TextProps;
  link?: LinkProps;
}
