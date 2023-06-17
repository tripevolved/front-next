import { Picture, Text, Box, CategoryBadge } from "@/ui";
import type { CardBlogProps } from "./card-blog.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function CardBlog({
  className,
  children,
  coverImg,
  postTitle,
  categories,
  sx,
  ...props
}: CardBlogProps) {
  const cn = makeCn("card-blog", className)(sx);

  return (
    <div className={cn} {...props}>
      <Picture src={coverImg} />
      <Box className="card-blog__content">
        <Box className="card-blog__content__category-row">
          {categories?.map((badge, i) => (
            <CategoryBadge {...badge} key={i} />
          ))}
        </Box>
        <Text variant="default" as="h2" size="xxl">
          {postTitle}
        </Text>
      </Box>
    </div>
  );
}
