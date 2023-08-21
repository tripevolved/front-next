import { Box, Text } from "@/ui";
import type { OtherChoicesCarouselProps } from "./matched-destinations-page.types";
import { OtherChoiceMatchedDestinationCard } from "./matched-destination-card.component";

import { makeCn } from "@/utils/helpers/css.helpers";

export function OtherChoicesCarousel({
  recommendedDestinations,
  className,
  children,
  title,
  sx,
  ...props
}: OtherChoicesCarouselProps) {
  const cn = makeCn("other-choices-carousel", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text size="xl" heading className="has-trip__recommendations-area__title">{title}</Text>
      <Box className="other-choices-carousel__row">
        <Box className="other-choices-carousel__row__container">
          {recommendedDestinations &&
            recommendedDestinations.map((dest, i) => <OtherChoiceMatchedDestinationCard {...dest} key={i} />)}
        </Box>
      </Box>
    </Box>
  );
}
