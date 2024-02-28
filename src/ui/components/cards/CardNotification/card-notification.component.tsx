import { Card, CardElevations, Divider, Grid } from "mars-ds";
import { Picture, Text, CategoryBadge } from "@/ui";
import type { CardNotificationProps } from "./card-notification.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function CardNotification({
  className,
  children,
  sx,
  notification,
  ...props
}: CardNotificationProps) {
  const cn = makeCn("card-notification", className)(sx);

  return (
    <Card className={cn} {...props} elevation={CardElevations.Medium}>
      <Grid columns={["40px", "auto"]} className="gap-lg">
        <Picture className="w-100" src="/assets/trip-notifications/lamp.svg" />
        <Grid gap={8}>
          <CategoryBadge color="#f5ac0a" description="Suas viagens" />
          {/** @ts-ignore */}
          <Text heading size="xxs" className="color-text-secondary">
            Nova dica de atração em Ouro Preto
          </Text>
          <Divider />
          <Text className="card-notification__datetime">Hoje - 13:23</Text>
        </Grid>
      </Grid>
    </Card>
  );
}
