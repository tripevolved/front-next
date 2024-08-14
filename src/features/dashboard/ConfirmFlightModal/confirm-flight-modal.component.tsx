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

        <div className="mt-md" style={{ display: 'flex'}}>
          <Picture src="/assets/destino/passagem-aerea.svg" />
          <Text heading className="flight-box__card__column__initials" style={{ marginLeft: 10}}>
            Passagem aérea
          </Text>
        </div>
      <Grid className="flight-box__card" gap={5} columns={[1, "30px", 1]}>
        <div>
        <Picture src= {props.airlineCompanyLogoUrl} />


        </div>
        <div>
          <Text  className="flight-box__card__column__initials">
            Saída: {props.fromAirportName}
          </Text>
          <Text  className="flight-box__card__column__initials">
            Chegada: {props.toAirportName}
          </Text>
        </div>
      </Grid>
    </Box>
  );
};
