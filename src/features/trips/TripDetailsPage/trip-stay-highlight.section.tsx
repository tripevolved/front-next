import { Box, Text, Picture, CardHighlight } from "@/ui";
import { TripStayHighlight, TripStayHighlightFeature } from "@/core/types";

const DESCRIPTION_MAP: Record<TripStayHighlightFeature, string> = {
  clean: "Essa hospedagem é recomendada por sua limpeza sempre impecável.",
  comfort: "Pode esperar um enorme conforto em sua hospedagem!",
  location: "A localização é o ponto alto dessa hospedagem!",
  luxury: "Curte luxo? Então pode esperar que essa hospedagem não vai te decepcionar.",
  personnel: "O atendimento por aqui é espetacular!",
  rustic: "Lugar bastante rústico.",
};

export const TripStayHighlightSection = ({ highlight }: { highlight: TripStayHighlight }) => {
  const description = highlight.type
    ? DESCRIPTION_MAP[highlight.type]
    : highlight.description || "";
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
          <Text>{description}</Text>
        </Box>
      </Box>
    </CardHighlight>
  );
};
