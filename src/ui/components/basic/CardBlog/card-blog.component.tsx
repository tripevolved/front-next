import type { CardBlogProps } from "./card-blog.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function CardBlog({ className, children, sx, ...props }: CardBlogProps) {
  const cn = makeCn("card-blog", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
