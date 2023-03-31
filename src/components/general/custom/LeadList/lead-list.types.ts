import type { LeadListFormProps, SectionBaseProps, TextProps } from "@/components";
import { LinkProps } from "mars-ds";

export interface LeadListProps extends SectionBaseProps {
  heading?: string | TextProps;
  text?: string | TextProps;
  link?: LinkProps;
}
