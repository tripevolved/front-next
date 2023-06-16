import { Box, Text } from "@/ui";
import type { BlogCardCarouselProps } from "./blog-card-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function BlogCardCarousel({
  className,
  children,
  title,
  sx,
  ...props
}: BlogCardCarouselProps) {
  const cn = makeCn("blog-card-carousel", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text variant="heading">{title}</Text>
      <Box className="blog-card-carousel__row"></Box>
    </Box>
  );
}
