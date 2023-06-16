import type { ComponentHTMLProps } from "@/core/types";
import { CategoryBadgeProps } from "@/ui";

export interface CardBlogProps extends ComponentHTMLProps {
  categories?: CategoryBadgeProps[];
  postTitle: string;
  coverImg: string;
}
