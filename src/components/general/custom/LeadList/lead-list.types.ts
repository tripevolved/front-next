import type { LeadListFormProps, SectionBaseProps, TextProps } from "@/components";

export interface LeadListProps extends SectionBaseProps {
  heading?: string | TextProps;
  text?: string | TextProps;
  form?: LeadListFormProps;
}
