import type { ComponentHTMLProps } from "@/core/types";
import type { TextProps } from "@/ui";

export interface AuthSectionProps extends ComponentHTMLProps {
  heading?: string | TextProps;
  withCard?: boolean;
};
