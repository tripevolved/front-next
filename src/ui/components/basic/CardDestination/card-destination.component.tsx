import { Box, Text, Button } from "@/ui";
import type { CardDestinationProps } from "./card-destination.types";

import { makeCn } from "@/utils/helpers/css.helpers";

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
      <Button size="sm" children="Quero ir" />
    </Box>
  );
}
