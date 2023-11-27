import { Box, Text, Picture, CardHighlight } from "@/ui";
import { TripStayHighlight, TripStayHighlightFeature } from "@/core/types";

export const TripStayHighlightSection = ({ highlight }: { highlight: TripStayHighlight }) => {
  const description = () => {
    return highlight.description === null 
      ? baseDescription(highlight.type)
      : highlight.description;
  }

  return (
    <CardHighlight className="trip-stay-highlight-box">
      <Box className="trip-stay-highlight-box__content">
        {highlight.type ? (
          <Picture
            className="trip-stay-highlight-box__content__icon"
            src={`/assets/stays/${highlight.type}.png`}
          />
        ) : null}
        <Box className="trip-stay-highlight-box__content__desc">
          <Text as="h3" heading size="xs">
            {highlight.title}
          </Text>
          <Text>{description()}</Text>
        </Box>
      </Box>
    </CardHighlight>
  );
};

const baseDescription = (feature: TripStayHighlightFeature) => {
  if (feature === "luxury") return "Curte luxo? Então pode esperar que essa hospedagem não vai te decepcionar.";
  if (feature === "comfort") return "Pode esperar um enorme conforto em sua hospedagem!";
  if (feature === "personnel") return "O atendimento por aqui é espetacular!";
  if (feature === "clean") return "Essa hospedagem é recomendada por sua limpeza sempre impecável.";
  if (feature === "rustic") return "Lugar bastante rústico.";
  if (feature === "location") return "A localização é o ponto alto dessa hospedagem!";

  return "";
}
