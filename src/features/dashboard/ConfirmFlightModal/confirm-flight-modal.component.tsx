import { Text, Box, Picture } from "@/ui";
import type { ConfirmFlightModalProps, FlightBoxProps } from "./confirm-flight-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button } from "mars-ds";

const mockFlightList: FlightBoxProps[] = [
  {
    typeFlight: "outbound",
    departureDate: "20/11/22 - 13:30",
    departureCityInitials: "CGH",
    departureAirport: "CONGONHAS",
    arrivalDate: "20/11/23 - 01:23",
    arrivalCityInitials: "CNF",
    arrivalAirport: "CONFINS",
  },
  {
    typeFlight: "return",
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

export const FlightBox = ({
  typeFlight,
  departureDate,
  departureCityInitials,
  departureAirport,
  arrivalAirport,
  arrivalCityInitials,
  arrivalDate,
}: FlightBoxProps) => {
  return (
    <Box className="flight-box">
      <Text size="lg" className="flight-box__label">
        Voo de
        {typeFlight == "outbound" && " ida"}
        {typeFlight == "return" && " volta"}
      </Text>

      <Box className="flight-box__card">
        <div className="flight-box__card__column">
          <Text size="xs" className="flight-box__card__column__label">
            {departureDate}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {departureCityInitials}
          </Text>
          <Text size="xs" className="flight-box__card__column__label">
            {departureAirport}
          </Text>
        </div>
        <Picture src="/assets/trip-dashboard/confirm-flight/flight.svg" />
        <div className="flight-box__card__column">
          <Text size="xs" className="flight-box__card__column__label">
            {arrivalDate}
          </Text>
          <Text heading className="flight-box__card__column__initials">
            {arrivalCityInitials}
          </Text>
          <Text size="xs" className="flight-box__card__column__label">
            {arrivalAirport}
          </Text>
        </div>
      </Box>
    </Box>
  );
};
