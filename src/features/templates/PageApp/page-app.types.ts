import type { ComponentHTMLProps, SeoProps } from "@/core/types";
import type { PageAppHeaderProps } from "@/features";

export interface PageAppProps {
  seo?: SeoProps;
  children: ComponentHTMLProps["children"];
  className?: string;
  headerOptions?: PageAppHeaderProps;
}
