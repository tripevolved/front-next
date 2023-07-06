import { Box, Button, Text, CardDestination, CardDestinationProps } from "@/ui";
import type { DestinationsCarouselProps } from "./destinations-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

const destinationsList: CardDestinationProps[] = [
  {
    matchRate: 78,
    cityName: "Paraty",
    cityImageURL: parsePhoto({
      title: "Paraty",
      sources: [{ url: "https://fakeimg.pl/200/?text=Paraty", width: 80, height: 80, type: "md" }],
    }),
  },
  {
    matchRate: 77,
    cityName: "Petrópolis",
    cityImageURL: parsePhoto({
      title: "Petrópolis",
      sources: [
        { url: "https://fakeimg.pl/200/?text=Petrópolis", width: 80, height: 80, type: "md" },
      ],
    }),
  },
  {
    matchRate: 74,
    cityName: "Florianópolis",
    cityImageURL: parsePhoto({
      title: "Florianópolis",
      sources: [
        { url: "https://fakeimg.pl/200/?text=Florianópolis", width: 80, height: 80, type: "md" },
      ],
    }),
  },
];

export function DestinationsCarousel({
  recommendedDestinations,
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
          {recommendedDestinations &&
            recommendedDestinations.map((dest, i) => <CardDestination {...dest} key={i} />)}
        </Box>
      </Box>
    </Box>
  );
}
