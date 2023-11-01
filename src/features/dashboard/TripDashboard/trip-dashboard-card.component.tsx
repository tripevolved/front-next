import { Card, CardElevations, Link } from "mars-ds";
import { TripDashboardCardProps } from "./trip-dashboard.types";
import { Picture, Text } from "@/ui";

export const TripDashboardCard = ({
  href,
  icon,
  description,
  qtd,
  color = "var(--color-brand-2)",
  type = "default",
}: TripDashboardCardProps) => {
  const quantifyText = type == "default" ? qtd : `${qtd} atrações inclusas`;
  return (
    <Card
      // @ts-ignore
      as={Link}
      className="trip-dashboard-card"
      href={href}
      elevation={CardElevations.Low}
      style={{ color }}
    >
      <Picture src={`/assets/trip-dashboard/${icon}.svg`} />
      <Text size="lg">{description}</Text>
      <Text as="p" size="xs" heading>
        <strong>{quantifyText}</strong>
      </Text>
    </Card>
  );
};
