import { Box, Button, Text } from "@/ui";
import type { DestinationsCarouselProps } from "./destinations-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function DestinationsCarousel({
  className,
  children,
  title,
  sx,
  ...props
}: DestinationsCarouselProps) {
  const cn = makeCn("destinations-carousel", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text size="lg">{title}</Text>
      <Box className="destinations-carousel__row">
        <Box className="destinations-carousel__row__container">
          <div>Bananá</div>
          <div>Bananá</div>
          <div>Bananá</div>
          <div>Bananá</div>
          <div>Bananá</div>
          <div>Bananá</div>
        </Box>
      </Box>
      <Button style={{ marginTop: 20, color: "white" }} backgroundColor="#1a365d">
        Quero uma viagem personalizada
      </Button>
    </Box>
  );
}
