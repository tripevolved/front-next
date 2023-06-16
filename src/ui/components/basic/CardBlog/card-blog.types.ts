import type { ComponentHTMLProps } from "@/core/types";

export interface CardBlogProps extends ComponentHTMLProps {
  categories?: string[];
  postTitle: string;
  coverImg: string;
}
