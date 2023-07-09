import { Box, Picture, Text } from "@/ui";
import { TripPayer } from "./trip-payment-page.types";

interface TripContactInformationSectionProps {
  contact: Pick<TripPayer, "email" | "phone"> | null;
}

export const TripContactInformationSection = ({ contact }: TripContactInformationSectionProps) => {
  return (
    <div className="trip-payment-section">
      <Box className="trip-payment-section__contact">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Contato
        </Text>
        <Text className="trip-payment-section__text" style={{ color: "$color-gray-1" }}>
          {contact?.email}
        </Text>
        <Text className="trip-payment-section__text" style={{ color: "$color-gray-1" }}>
          {contact?.phone}
        </Text>
      </Box>
    </div>
  );
};
