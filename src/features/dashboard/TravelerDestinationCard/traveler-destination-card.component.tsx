import { Box, Button, Picture, Text } from "@/ui";
import type { TravelerDestinationCardProps } from "./traveler-destination-card.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { formatByDataType } from "@/utils/helpers/number.helpers";

export function TravelerDestinationCard({
  className,
  children,
  sx,
  matchRate,
  cityName,
  cityImageURL,
  travelersNumber,
  price,
  ...props
}: TravelerDestinationCardProps) {
  const cn = makeCn("traveler-destination-card", className)(sx);

  return (
    <Box
      className={cn}
      {...props}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('${cityImageURL}')`,
      }}
    >
        <Box className="traveler-destination-card__header">
          {matchRate ? (
            <>
              <Picture width={24} src="/emoji/target-arrow.png" />
              <Text>
                Match: <strong>{matchRate}%</strong>
              </Text>
            </>
            ) : <></>
          }
        </Box>
      <Box className="traveler-destination-card__footer">
        <Box className="traveler-destination-card__footer__city-name">
          <Text variant="heading">{cityName}</Text>
          <Text>Para {travelersNumber} pessoas</Text>
        </Box>
        {price ? (
          <Text size="xxl" className="traveler-destination-card__footer__price">
            <strong>{formatByDataType(price, "CURRENCY")}</strong>
          </Text>) : <></>
        }
        <Button>Ver detalhes</Button>
      </Box>
    </Box>
  );
}
