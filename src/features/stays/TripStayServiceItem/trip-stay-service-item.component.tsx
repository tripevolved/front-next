import { TripStayFeature } from "@/core/types";
import { Picture, Text } from "@/ui";

export const TripStayServiceItem = ({
  title,
  type,
  color = "var(--color-brand-1)",
}: TripStayFeature & { color?: string }) => {
  return (
    <div className="trip-stay-service-item" style={{ color }}>
      <Picture src={`/assets/stays/${type}.svg`} />
      <Text>{title}</Text>
    </div>
  );
};
