import { EmptyState, ErrorState, Text } from "@/ui";
import { Button } from "mars-ds";
import { TripsApiService } from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { Action, IsStayAction, IsTransportationAction, ItineraryListV2 } from "@/core/types";
import { ItineraryItem } from "../Itinerary/itinerary-item.wrapper";
import { StayAction } from "../Itinerary/stay.action";
import { FlightAction } from "../Itinerary/flight.action";
import { RouteAction } from "../Itinerary/route.action";
import { ItineraryEnd } from "../Itinerary/itinerary-end.action";
import { DestinationDetails } from "./destination-details/destination-details.component";

export function NewItinerary({ tripId, title }: any) {
  const [data, setData] = useState<ItineraryListV2>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    TripsApiService.getItineraryV2(tripId).then(setData).catch(setError);
  }, [tripId]);

  useEffect(() => {
    let token: NodeJS.Timeout;
    if (data?.isReady === false) {
      token = setTimeout(() => {
        TripsApiService.getItineraryV2(tripId).then(setData).catch(setError);
      }, 5000);
    }
    return () => {
      clearTimeout(token);
    };
  }, [data, tripId]);

  const itinerary = useMemo(() => {
    if (!data) return [];
    let allActions: Action[] = [...data.stays, ...data.transportations];
    let actionsInOrder: Action[] = [];
    try {
      const firstAction = allActions.find((action) => action.previousActionId === null);
      if (firstAction === undefined) {
        console.error("Error getting actions: no first action found.");
        return [];
      }
      actionsInOrder = [firstAction];
      for (let index = 0; index < allActions.length; index++) {
        const next = allActions.find(
          (nextAction) => nextAction.actionId === actionsInOrder[index].nextActionId
        );
        if (next) {
          actionsInOrder = [...actionsInOrder, next];
        }
      }
    } catch {
      setError("Error on sorting actions");
    } finally {
      return actionsInOrder;
    }
  }, [data]);

  const groupedActions = useMemo(() => {
    type GroupedAction = { groupName: string; actions: Action[] };
    let actions: GroupedAction[] = [];
    try {
      actions = itinerary.reduce<{ groupName: string; actions: Action[] }[]>(
        (acc: { groupName: string; actions: Action[] }[], itineraryAction, currentIndex) => {
          if (!itineraryAction) return acc;
          const lastGroup = acc[acc.length - 1];
          if (currentIndex === 0) {
            acc = [{ groupName: itineraryAction.from ?? "", actions: [itineraryAction] }];
          } else if (lastGroup.groupName === (itineraryAction?.from ?? "")) {
            lastGroup.actions.push(itineraryAction);
          } else {
            acc = [...acc, { groupName: itineraryAction.from ?? "", actions: [itineraryAction] }];
          }
          return acc;
        },
        []
      );
    } catch {
      setError("Error sorting actions by city");
    } finally {
      return actions;
    }
  }, [itinerary]);

  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

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
      </div>
      <div className="itinerary">
        {groupedActions.map((group) => {
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
                    return <RouteAction action={itineraryAction} key={itineraryAction.actionId} />;
                  } else if (itineraryAction.transportationType === "FLIGHT") {
                    return (
                      <FlightAction
                        key={itineraryAction.actionId}
                        action={itineraryAction}
                        tripId={tripId}
                      />
                    );
                  }
                }
              })}
            </ItineraryItem>
          );
        })}
        <ItineraryItem title="Aproveitar!" key="enjoy">
          <ItineraryEnd />
        </ItineraryItem>
      </div>
      <DestinationDetails />
    </div>
  );
}
