import { TripFoodTipsSectionProps } from "./trip-details-page.types";
import { Box, Picture, Text } from "@/ui";

export const TripFoodTipsSection = ({ text }: TripFoodTipsSectionProps) => {
  return (
    <div className="trip-content-item">
      <Box>
        <Picture src={"/assets/destino/dicas-gastronomicas.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Dicas gastronômicas
        </Text>
        <Text className="trip-script-section__text" style={{ color: "$color-gray-1" }}>
          {text}
        </Text>
      </Box>
    </div>
  );
};
