import type { CardDestinationProps } from "./card-destination.types";
import { Box, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button } from "mars-ds";

export function CardDestination({
  className,
  children,
  sx,
  cityName,
  cityImageURL,
  ...props
}: CardDestinationProps) {
  const cn = makeCn("card-destination", className)(sx);

  return (
    <Box
      className={cn}
      {...props}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cityImageURL}')`,
      }}
    >
      <Text size="sm" variant="heading" className="card-destination__city-name">
        {cityName}
      </Text>
      <Button size="sm">Quero ir</Button>
    </Box>
  );
}
