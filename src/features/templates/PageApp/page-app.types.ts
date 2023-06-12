import type { ComponentHTMLProps, SeoProps } from "@/core/types";

export interface PageAppProps {
  seo?: SeoProps;
  children: ComponentHTMLProps["children"];
}
