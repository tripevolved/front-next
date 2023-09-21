import type { ComponentHTMLProps } from "@/core/types";

export interface PageAppHeaderProps extends ComponentHTMLProps {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  href?: string;
}
