import type { HomeNumberedCardProps } from "./home-numbered-card.types";

import { Text } from "@/ui";
import classNames from "classnames";
import { Card } from "mars-ds";

export function HomeNumberedCard ({
  className,
  children,
  heading,
  subtitle,
  text,
  bullet,
  ...props
}: HomeNumberedCardProps) {
  const cn = classNames("home-numbered-card", className);

  return (
    <Card className={cn} {...props}>
      {bullet ? (
        <Text as="span" size="xl" className="home-numbered-card__bullet">
          {bullet}
        </Text>
      ) : null}
      {heading ? (
        <Text size="xl" as="h3" className="home-numbered-card__heading">
          {heading}
        </Text>
      ) : null}
      {subtitle ? (
        <Text size="lg" className="home-numbered-card__subtitle">
          {subtitle}
        </Text>
      ) : null}
      {text ? <Text className="home-numbered-card__text">{text}</Text> : null}
      {children}
    </Card>
  );
};
