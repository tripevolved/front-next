import { Box, Text } from "@/ui";
import type { OtherChoicesCarouselProps } from "./matched-destinations-page.types";
import { OtherCoiceMatchedDestinationCard } from "./matched-destination-card.component";

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
      <Text size="lg">{title}</Text>
      <Box className="other-choices-carousel__row">
        <Box className="other-choices-carousel__row__container">
          {recommendedDestinations &&
            recommendedDestinations.map((dest, i) => <OtherCoiceMatchedDestinationCard {...dest} key={i} />)}
        </Box>
      </Box>
    </Box>
  );
}
