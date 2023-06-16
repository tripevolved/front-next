import { Box, Text } from "@/ui";
import type { CategoryBadgeProps } from "./category-badge.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function CategoryBadge({
  className,
  children,
  description,
  color,
  sx,
  ...props
}: CategoryBadgeProps) {
  const cn = makeCn("category-badge", className)(sx);

  return (
    <Box className={cn} {...props} style={{ backgroundColor: `${color}20` }}>
      <Text size="md" color={color}>
        {description}
      </Text>
    </Box>
  );
}
