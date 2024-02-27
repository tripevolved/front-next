import { Text, Box, Picture } from "@/ui";
import type { ConfirmFlightModalProps, FlightBoxProps } from "./confirm-flight-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Grid } from "mars-ds";
import { toFullDate } from "@/utils/helpers/dates.helpers";

export function ConfirmFlightModal({
  className,
  children,
  sx,
  flightList,
  ...props
}: ConfirmFlightModalProps) {
  const cn = makeCn("confirm-flight-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Text className="confirm-flight-modal__title" heading>
        Confirmar voos
      </Text>

      <Text className="confirm-flight-modal__sub-title">
        Confira os voos selecionados e confirme a escolha
      </Text>

      <Box className="confirm-flight-modal__flight-box">
        {flightList?.length
          ? flightList.map((flight, i) => <FlightBox {...flight} key={i} />)
          : null}
      </Box>

      <Button className="confirm-flight-modal__button">Confirmar voos</Button>
    </div>
  );
}

export const FlightBox = ({ isOutbound = false, className, ...props }: FlightBoxProps) => {
  return (
    <Box className={`flight-box ${className}`}>
      {!props.hideTitle ? (
        <Text size="lg" className="flight-box__label">
          Voo de {isOutbound ? "ida" : "volta"}
        </Text>
      ) : null}

      <Grid className="flight-box__card" gap={5} columns={[1, "30px", 1]}>
        <div className="flight-box__card__column h-100 gap-sm">
          <Text size="sm" className="flight-box__card__column__label text-center">
            {toFullDate(new Date(props.departure))}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {props.fromAirportCode}
          </Text>
          <Text size="sm" className="flight-box__card__column__label text-center">
            {props.fromAirportName}
          </Text>
        </div>
        <Picture src="/assets/trip-dashboard/confirm-flight/flight.svg" />
        <div className="flight-box__card__column h-100 gap-sm">
          <Text size="sm" className="flight-box__card__column__label text-center">
            {toFullDate(new Date(props.arrival))}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {props.toAirportCode}
          </Text>
          <Text size="sm" className="flight-box__card__column__label text-center">
            {props.toAirportName}
          </Text>
        </div>
      </Grid>
    </Box>
  );
};
