import { Box, Text } from "@/ui";

export const TripPaymentMethodSection = () => {
  return (
    <Box className="trip-payment-section">
      <Text as="h2" heading size="xs" className="trip-payment-section__title">
        Forma de pagamento
      </Text>
      <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
        Cartão de crédito ------- Pix (TODO: alterar para RADIO)
      </Text>
      <Text>COMBO 2x de 1683,24</Text>
    </Box>
  );
};
