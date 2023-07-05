import { Box, Text, Picture } from "@/ui";

export const TripScriptBlockedSection = () => {
  return (
    <div className="trip-content-item">
      <Box>
        <Picture src={"/assets/destino/suporte.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text className="trip-script-section__text" style={{ color: "$color-gray-1" }}>
          {
            "Prossiga para o pagamento para ter acesso ao roteiro completo"
          }
        </Text>
      </Box>
    </div>
  );
};
