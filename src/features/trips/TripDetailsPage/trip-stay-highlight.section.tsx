import { Box, Text, Picture, CardHighlight } from "@/ui";
import { TripStayHighlight } from "@/core/types";

export const TripStayHighlightSection = ({ highlight }: { highlight: TripStayHighlight }) => {
  return (
    <CardHighlight className="trip-highlight-box">
      <Text heading size="xs" className="trip-highlight-box__title">
        Destaques da hospedagem
      </Text>
      <Box className="trip-highlight-box__content">
        {highlight.type ? (
          <Picture
            className="trip-highlight-box__content__icon"
            src={"/assets/stays/" + highlight.type + ".png"}
          />
        ) : null}
        <Box className="trip-highlight-box__content__desc">
          <Text as="h3" heading size="xs">
            {highlight.title}
          </Text>
          <Text>{highlight.description}</Text>
        </Box>
      </Box>
    </CardHighlight>
  );
};
