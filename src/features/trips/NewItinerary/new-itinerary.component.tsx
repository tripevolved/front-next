import { CardHighlight, EmptyState, ErrorState, Text } from "@/ui";
import { Button } from "mars-ds";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import { ReactNode, useMemo, useState } from "react";
import { Action, IsStayAction, IsTransportationAction } from "@/core/types";
import { ItineraryItem } from "../Itinerary/itinerary-item.wrapper";
import { StayAction } from "../Itinerary/stay.action";
import { FlightAction } from "../Itinerary/flight.action";
import { RouteAction } from "../Itinerary/route.action";

export function NewItinerary({ tripId, title }: any) {
  const [open, setOpen] = useState(false);
  const fetcher = async () => {
    const itinerary = await TripsApiService.getItineraryV2(tripId);
    return itinerary;
  };
  const { data, isLoading, error } = useSWR(`get-trip-itinerary-${tripId}`, fetcher, {
    revalidateOnFocus: false,
  });

  const itinerary = useMemo(() => {
    if (!data) return [];

    const allActions: Action[] = [...data.stays, ...data.transportations];
    const firstAction = allActions.find((action) => action.previousActionId === null);
    if (firstAction === undefined) {
      console.error("Error on getting actions. No first action.");
      return [];
    }
    let actionsInOrder: Action[] = [firstAction];
    while (actionsInOrder.length < allActions.length) {
      actionsInOrder = [
        ...actionsInOrder,
        allActions.find(
          (nextAction) => nextAction.actionId === actionsInOrder.at(-1)?.nextActionId
        )!,
      ];
    }
    return actionsInOrder;
  }, [data]);

  const icon = {
    ROUTE: "carro",
    TRANSFER: "carro",
    FLIGHT: "passagem-aerea",
    RENTAL_CAR: "carro",
    ACCOMMODATION: "hospedagem",
  };

  const openAccordion = () => {
    setOpen(!open);
  };
  if (!data) return <EmptyState />;
  if ([...(data?.stays ?? []), ...(data?.transportations ?? [])].length == 0) return <EmptyState />;
  if (error) return <ErrorState />;
  return (
    <div className="new-itinerary">
      <div>
        <Text heading size="lg">
          Seu itinerário
        </Text>
        <Text>
          Analisando suas informações, preparamos o seguinte itinerário para você. Ele começa na sua
          cidade e vai até {title}, para que você só tenha o trabalho de curtir a sua viagem. Você
          pode alterar suas escolhas e estamos à disposição para atendê-lo da melhor forma.
        </Text>
        <Button
          variant="neutral"
          href="#"
          size="sm"
          style={{
            border: "none",
            textDecoration: "underline",
            padding: 0,
            fontWeight: 500,
            marginTop: 10,
          }}
        >
          Ver itinerário completo
        </Button>
      </div>
      <div className="itinerary">
        <div>
          <CardHighlight
            variant="warning"
            text="Preciso de um aluguel de carro"
            onClick={openAccordion}
            cta={{
              label: "Ver detalhes",
              isRtl: true,
              className: "no-border",
            }}
          >
            {open && (
              <div style={{ display: "block" }}>
                <p style={{ color: "#8c8e92" }}>
                  Seu vôo só parte as 7h30 do dia 21 de agosto. Selecionamos uma hospedagem para
                  você!
                </p>
              </div>
            )}
          </CardHighlight>
        </div>
        {!itinerary || itinerary.length === 0 ? (
          <>ERRO</>
        ) : (
          itinerary
            .reduce<{ groupName: string; actions: Action[] }[]>(
              (
                acc: { groupName: string; actions: Action[] }[],
                itineraryAction,
                currentIndex,
                allActions
              ) => {
                if (currentIndex === 0) {
                  acc = [{ groupName: itineraryAction.from ?? "", actions: [itineraryAction] }];
                }
                const lastGroup = acc[acc.length - 1];
                if (lastGroup.groupName === itineraryAction.from) {
                  lastGroup.actions.push(itineraryAction);
                } else {
                  acc = [
                    ...acc,
                    { groupName: itineraryAction.from ?? "", actions: [itineraryAction] },
                  ];
                }
                return acc;
              },
              []
            )
            .map((group) => {
              return (
                <ItineraryItem title={group.groupName} key={group.groupName}>
                  {group.actions.map((itineraryAction) => {
                    if (IsStayAction(itineraryAction)) {
                      return (
                        <StayAction
                          action={itineraryAction}
                          tripId={data?.tripId}
                          key={itineraryAction.actionId}
                        />
                      );
                    } else if (IsTransportationAction(itineraryAction)) {
                      if (["ROUTE", "TRANSFER"].includes(itineraryAction.transportationType)) {
                        return (
                          <RouteAction action={itineraryAction} key={itineraryAction.actionId} />
                        );
                      } else if (itineraryAction.transportationType === "FLIGHT") {
                        return <></>; //<FlightAction {...action} tripId={tripId} />
                      }
                    }
                  })}
                </ItineraryItem>
              );
            })
        )}
      </div>
    </div>
  );
}
