import { Box, Text, Picture } from "@/ui";

export const TripSupportSection = () => {
  return (
    <div className="trip-content-item">
      <Box>
        <Picture src={"/assets/destino/suporte.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Suporte durante a viagem
        </Text>
        <Text className="trip-script-section__text" style={{ color: "$color-gray-1" }}>
          {
            "Para uma experiência única e livre de estresse, oferecemos suporte do início ao fim da sua trip, em 360º. Com tudo organizado e planejado, sua preocupação é uma só: curtir a viagem dos sonhos!"
          }
        </Text>
      </Box>
    </div>
  );
};
