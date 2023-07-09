import { Box, Picture, Text } from "@/ui";
import { TripPayer } from "./trip-payment-page.types";

interface TripContactInformationSectionProps extends Pick<TripPayer, "email" | "phone">{}

export const TripContactInformationSection = ({ email, phone }: TripContactInformationSectionProps) => {
  return (
    <div className="trip-payment-section">
      <Box>
        <Picture src={"/assets/destino/dicas-gastronomicas.svg"} />
      </Box>
      <Box className="trip-payment-section__contact">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Contato
        </Text>
        <Text className="trip-payment-section__text" style={{ color: "$color-gray-1" }}>
          {email}
        </Text>
        <Text className="trip-payment-section__text" style={{ color: "$color-gray-1" }}>
          {phone}
        </Text>
      </Box>
    </div>
  );
};
