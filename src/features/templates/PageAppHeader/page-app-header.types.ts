import type { ComponentHTMLProps } from "@/core/types";

export interface PageAppHeaderProps extends ComponentHTMLProps {
  title?: string;
  backButton?: boolean;
  href?: string;
}
