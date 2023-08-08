import { Card, Icon } from "mars-ds";
import type { AddAttractionCardProps } from "./add-attraction-card.types";
import { Box, Picture, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";

export function AddAttractionCard({
  className,
  children,
  sx,
  attraction,
  onAddClick,
  onViewClick,
  ...props
}: AddAttractionCardProps) {
  const cn = makeCn("add-attraction-card", className)(sx);

  return (
    <Card className={cn} {...props} elevation="xl">
      <Picture src="/assets/script/attraction.svg" className="add-attraction-card__icon" />
      <Box className="add-attraction-card__content" onClick={() => onViewClick()}>
        <Text className="add-attraction-card__content__name">{attraction.name}</Text>
        <Text className="add-attraction-card__content__address">{attraction.address}</Text>
      </Box>
      <Icon name="plus-circle" color="var(--color-brand-1)" onClick={() => onAddClick()} />
    </Card>
  );
}
