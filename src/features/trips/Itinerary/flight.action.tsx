import { Modal, Button } from "mars-ds";
import { Text, CardHighlight, Picture } from "@/ui";
import { FlightDetailsPainel } from "@/features";
import { TripTransportation } from "@/core/types";

export const FlightAction = ({ action }: { action: TripTransportation }) => {
  const handleSeeDetails = () => {
    Modal.open(() => <FlightDetailsPainel transportationData={action!} isModalView />, {
      size: "md",
      closable: true,
    });
  };

  const getFlight = (data: TripTransportation) => {
    const fromCode = data.fromName?.split("-")[0].trim();
    const toCode = data.toName?.split("-")[0].trim();
    const outboundFlight =
      data.flightView.outboundFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode && item.toAirportCode === toCode
      ) || null;

    const returnFlight =
      data.flightView.returnFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode && item.toAirportCode === toCode
      ) || null;

    return outboundFlight || returnFlight;
  };

  // if (error) return <ErrorState />;

  return (
    <div className="pl-lg itinerary__item">
      {action.isReady ? (
        <div className="flex flex-column gap-md py-lg ml-xl">
          <div className="flex flex-row gap-xl  items-center">
            <Picture src={`/assets/destino/passagem-aerea.svg`} style={{ width: 40 }} />
            <Text as="h3" heading size="xs" className="my-auto">
              <strong>Passagem aérea</strong>
            </Text>
          </div>
          <div className="flex flex-row gap-xl">
            <div style={{ width: 40 }} />
            <div className="flex flex-row justify-start gap-md">
              <div className="flex flex-row gap-xl">
                <Picture
                  src={action.partnerLogoUrl ?? `/assets/destino/hotel-casa-grande.png`}
                  alt={"flight"}
                  style={{ width: 50, height: 50 }}
                />
                <div className="items-end self-end">
                  <Text as="p" size="xs" style={{ padding: 0, margin: 0 }}>
                    <p>{`Saída: ${action.fromName}`}</p>
                  </Text>
                  <Text as="p" size="xs" style={{ padding: 0, margin: 0 }}>
                    <p>{`Chegada: ${action.toName}`}</p>
                  </Text>
                </div>
              </div>
              <Button
                variant="neutral"
                size="sm"
                style={{
                  border: "none",
                  textDecoration: "underline",
                  alignSelf: "flex-end",
                  padding: 0,
                  fontWeight: 500,
                  marginTop: 10,
                }}
                onClick={handleSeeDetails}
              >
                Ver Detalhes do vôo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CardHighlight
          variant="warning"
          heading="Ainda não escolhemos o voo para sua viagem"
          text="Fale conosco e vamos te ajudar!"
        />
      )}
    </div>
  );
};
