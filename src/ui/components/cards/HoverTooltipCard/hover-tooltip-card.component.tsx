import type { HoverTooltipCardProps } from "./hover-tooltip-card.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Text } from "@/ui";

export function HoverTooltipCard({
  className,
  children,
  sx,
  title = "",
  text
}: HoverTooltipCardProps) {
  const cn = makeCn("hover-tooltip", className)(sx);

  return (
    <div className={cn}>
      {children}
      <span className="hover-tooltip__text">
        <Text variant="heading" size="xs">
          {title}
        </Text>
        <Text size="sm">{text}</Text>
      </span>
    </div>
  );
}
