import { CardHighlight, EmptyState, ErrorState, Text } from "@/ui";
import { Button } from "mars-ds";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { Action, IsStayAction, IsTransportationAction } from "@/core/types";
import { ItineraryItem } from "../Itinerary/itinerary-item.wrapper";
import { StayAction } from "../Itinerary/stay.action";

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
    type GroupedActions = { fromIndex: string; actions: Action[] };
    let groupedActions = [...data.stays, ...data.transportations].reduce<GroupedActions[]>(
      (acc: GroupedActions[], curr: Action) => {
        if (acc.length === 0) {
          acc = [
            {
              fromIndex: curr.from ?? "",
              actions: [curr],
            },
          ];
        } else {
          const existingGroup = acc.find((action) => action.fromIndex === curr.from);
          if (existingGroup) {
            const accFiltered = acc.filter((item) => item.fromIndex !== existingGroup.fromIndex);
            const newActionsList = [...existingGroup.actions, curr];
            const updatedExistingGroup = {
              fromIndex: existingGroup.fromIndex,
              actions: newActionsList,
            };
            console.log(newActionsList, updatedExistingGroup);
            acc = [...accFiltered, updatedExistingGroup];
          } else {
            acc = [...acc, { fromIndex: curr.from ?? "", actions: [curr] }];
          }
        }
        console.log("ACC", acc);
        return acc;
      },
      []
    );

    let groupedAndSortedActions: GroupedActions[] = [];
    console.info(groupedActions);
    for (let group of groupedActions) {
      if (group.actions.length > 1) {
        const firstAction =
          group.actions.find(
            (action) =>
              action.previousActionId === null ||
              !group.actions.some((innerAction) => innerAction.actionId === action.previousActionId)
          ) ?? group.actions[0];
        let actionsInOrder: Action[] = [firstAction];
        while (actionsInOrder.length < group.actions.length) {
          actionsInOrder = [
            ...actionsInOrder,
            group.actions.find(
              (nextAction) => nextAction.actionId === actionsInOrder.at(-1)?.nextActionId
            )!,
          ];
          group.actions = actionsInOrder;
        }
      }
      if (group.actions.some((action) => action.previousActionId === null)) {
        groupedAndSortedActions = [group, ...groupedAndSortedActions];
      } else if (group.actions.some((action) => action.nextActionId === null)) {
        groupedAndSortedActions = [...groupedAndSortedActions, group];
      } else {
        const foundIndexNext = groupedAndSortedActions.findIndex((sortedGroup) =>
          sortedGroup.actions.some((action) => action.nextActionId === group.actions[0].actionId)
        );
        if (foundIndexNext > -1) {
          groupedAndSortedActions = [
            ...groupedAndSortedActions.slice(0, foundIndexNext),
            group,
            ...groupedAndSortedActions.slice(foundIndexNext),
          ];
        }
        const foundIndexPrevious = groupedAndSortedActions.findIndex((sortedGroup) =>
          sortedGroup.actions.some(
            (action) => action.previousActionId === group.actions[group.actions.length - 1].actionId
          )
        );
        if (foundIndexPrevious > -1) {
          groupedAndSortedActions = [
            ...groupedAndSortedActions.slice(0, foundIndexPrevious - 1),
            group,
            ...groupedAndSortedActions.slice(foundIndexPrevious - 1),
          ];
        }
      }
    }
    console.log(groupedAndSortedActions);
    return groupedAndSortedActions;
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
          itinerary.map((itineraryOrigin) => {
            return itineraryOrigin.actions.map((itineraryAction) => {
              if (IsStayAction(itineraryAction)) {
                return (
                  <ItineraryItem
                    actionType="ACCOMMODATION"
                    title={itineraryAction.from ?? ""}
                    key={itineraryAction.actionId}
                  >
                    <StayAction action={itineraryAction} tripId={data?.tripId} />
                  </ItineraryItem>
                );
              } else if (IsTransportationAction(itineraryAction)) {
                return (
                  <div key={itineraryAction.actionId}>TRANSPORTE {itineraryAction.actionId}</div>
                );
              }
            });
          })
        )}
        {/* {data?.actions.length
          ? data?.actions.map((action, i) =>
              action.type == "RENTAL_CAR" ? ( */}
        {/* <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <RentalCarAction {...action} key={`${i}-${action.tripItineraryActionId}`} />
                </ItineraryItem>
              {/* ) : action.type == "FLIGHT" ? ( */}
        {/* <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <FlightAction {...action} tripId={tripId} />
                </ItineraryItem>
              {/* ) : action.type == "ROUTE" || action.type == "TRANSFER" ? ( */}
        {/* <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <RouteAction
                    {...action}
                    tripId={tripId}
                    key={`${i}-${action.tripItineraryActionId}`}
                  />
                </ItineraryItem>
            {data?.stays.map((stay, index) => 
              <ItineraryItem
              actionType={'ACCOMMODATION'}
              title={stay.name}
              key={`${index}-${stay.id}`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: 10,
                  padding: 10,
                }}
              >
                <div>
                  <Picture
                    src={`/assets/destino/${icon.ACCOMMODATION}.svg`}
                    style={{ width: 40 }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}>
                  <label
                    style={{ color: "#1A365D", fontSize: 16, textTransform: "capitalize" }}
                  >
                    {icon.ACCOMMODATION}
                  </label>
                  <span
                    style={{
                      color: "#5A626D",
                      fontSize: 14,
                      marginTop: 6,
                    }}
                  >
                    {stay.name}
                  </span>
                </div>
              </div> } */}
        {/* <AccommodationAction
                {...action}
                tripId={tripId}
                key={`${index}-${stay.id}`}
              /> */}
        {/* </ItineraryItem>
              )} */}
      </div>
    </div>
  );
}
