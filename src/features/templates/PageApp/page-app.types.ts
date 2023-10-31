import type { ComponentHTMLProps, SeoProps } from "@/core/types";
import type { PageAppMenuValue } from "../PageAppMenu/page-app-menu.context";

export interface PageAppProps {
  seo?: SeoProps;
  children: ComponentHTMLProps["children"];
  className?: string;
  headerOptions?: PageAppMenuValue;
}
