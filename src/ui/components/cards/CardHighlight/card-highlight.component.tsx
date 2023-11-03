import type { CardHighlightProps } from "./card-highlight.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Button, Card } from "mars-ds";
import { Text } from "@/ui";

export function CardHighlight({
  className,
  cta,
  children,
  heading,
  text,
  sx,
  variant = "warning",
  ...props
}: CardHighlightProps) {
  const cn = makeCn("card-highlight", className, `card-highlight--${variant}`)(sx);
  return (
    <Card className={cn} {...props}>
      {heading ? (
        <Text as="h3" heading size="xs" className="mb-md">
          <strong>{heading}</strong>
        </Text>
      ) : null}
      {text ? <Text className="color-text-secondary mb-md">{text}</Text> : null}
      {cta ? (
        <div>
          <Button variant="neutral" {...cta} />
        </div>
      ) : null}
      {children}
    </Card>
  );
}
