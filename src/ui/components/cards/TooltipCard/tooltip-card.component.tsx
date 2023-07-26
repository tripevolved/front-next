import { Card } from "mars-ds";
import type { TooltipCardProps } from "./tooltip-card.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Picture, Text } from "@/ui";
import { useState } from "react";

export function TooltipCard({
  className,
  children,
  sx,
  title = "",
  text,
  ...props
}: TooltipCardProps) {
  const cn = makeCn("tooltip-card", className)(sx);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={cn} {...props}>
      <Picture
        src="/assets/script/help-circle.svg"
        className="tooltip-card__icon"
        onClick={() => setIsVisible(!isVisible)}
      />
      {isVisible && (
        <Card className="tooltip-card__tooltip" onClick={() => setIsVisible(false)} elevation="lw">
          <Text variant="heading" className="tooltip-card__tooltip__title" size="xs">
            {title}
          </Text>
          <Text className="tooltip-card__tooltip__text">{text}</Text>
        </Card>
      )}
    </div>
  );
}
