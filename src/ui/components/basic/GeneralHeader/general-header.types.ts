import type { ComponentHTMLProps } from "@/core/types";

export interface GeneralHeaderProps extends ComponentHTMLProps {
  title: string;
  backButton: boolean;
  href: string;
}
