import { Text, Box, Picture } from "@/ui";
import type { ConfirmFlightModalProps, FlightBoxProps } from "./confirm-flight-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button } from "mars-ds";

const mockFlightList: FlightBoxProps[] = [
  {
    departureDate: "20/11/22 - 13:30",
    departureCityInitials: "CGH",
    departureAirport: "CONGONHAS",
    arrivalDate: "20/11/23 - 01:23",
    arrivalCityInitials: "CNF",
    arrivalAirport: "CONFINS",
  },
  {
    departureDate: "20/11/22 - 13:30",
    departureCityInitials: "CNF",
    departureAirport: "CONFINS",
    arrivalDate: "20/11/23 - 01:23",
    arrivalCityInitials: "CGH",
    arrivalAirport: "CONGONHAS",
  },
];

export function ConfirmFlightModal({ className, children, sx, ...props }: ConfirmFlightModalProps) {
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
        {mockFlightList.map((flight, i) => (
          <FlightBox {...flight} key={i} />
        ))}
      </Box>

      <Button className="confirm-flight-modal__button">Confirmar voos</Button>
    </div>
  );
}

export const FlightBox = ({ isOutbound = false, ...props }: FlightBoxProps) => {
  return (
    <Box className="flight-box">
      <Text size="lg" className="flight-box__label">
        Voo de
        {isOutbound ? "ida" : "volta"}
      </Text>

      <Box className="flight-box__card">
        <div className="flight-box__card__column">
          <Text size="xs" className="flight-box__card__column__label">
            {props.departure}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {props.fromAirportCode}
          </Text>
          <Text size="xs" className="flight-box__card__column__label">
            {props.fromAirportName}
          </Text>
        </div>
        <Picture src="/assets/trip-dashboard/confirm-flight/flight.svg" />
        <div className="flight-box__card__column">
          <Text size="xs" className="flight-box__card__column__label">
            {props.arrival}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {props.toAirportCode}
          </Text>
          <Text size="xs" className="flight-box__card__column__label">
            {props.toAirportName}
          </Text>
        </div>
      </Box>
    </Box>
  );
};
