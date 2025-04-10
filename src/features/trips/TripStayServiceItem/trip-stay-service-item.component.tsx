import { TripStayFeature } from "@/core/types";
import { Picture, Text } from "@/ui";

export const TripStayServiceItem = ({ title, type }: TripStayFeature & { color?: string }) => {
  return (
    <div className="trip-stay-service-item">
      {type && <Picture src={`/assets/stays_brand_4/${type}.svg`} />}
      <Text>{title}</Text>
    </div>
  );
};
