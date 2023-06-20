import { Box, Button, Text, CardDestination, CardDestinationProps } from "@/ui";
import type { DestinationsCarouselProps } from "./destinations-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";

const destinationsList: CardDestinationProps[] = [
  {
    cityName: "Paraty",
    cityImageURL: "https://fakeimg.pl/200/?text=Paraty",
  },
  {
    cityName: "Petropolis",
    cityImageURL: "https://fakeimg.pl/200/?text=Petropolis",
  },
  {
    cityName: "Florianopolis",
    cityImageURL: "https://fakeimg.pl/200/?text=Florianopolis",
  },
  {
    cityName: "Gramado",
    cityImageURL: "https://fakeimg.pl/200/?text=Gramado",
  },
];

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
          {destinationsList.map((dest, i) => (
            <CardDestination {...dest} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
