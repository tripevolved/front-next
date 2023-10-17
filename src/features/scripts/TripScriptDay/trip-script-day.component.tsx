import { Box, Text } from "@/ui";
import { Button, Divider, Grid, Icon, Link } from "mars-ds";
import { TripScriptDayComponentProps } from "./trip-script-day.types";
import { TripScriptActionOrSuggestion } from "../TripScriptPanel";
import { TripScriptFreeDay } from "../TripScriptPanel/trip-script-free-day.component";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";

export const TripScriptDayComponent = ({
  tripId,
  day,
  dayDetail,
  allowMoreAttractions = true,
  allowDelete = false,
  onDelete
}: TripScriptDayComponentProps) => {
  const { setTripScriptDay } = useAppStore();
  const router = useRouter();

  const handleAddAttractions = () => {
    setTripScriptDay(dayDetail);

    var encodedRedirect = encodeURIComponent(`/app/viagens/roteiro/construcao/${tripId}/?stepName=build&day=${day}`);
    router.push(`/app/viagens/roteiro/atracoes/${tripId}?redirectTo=${encodedRedirect}`);
  };

  return (
    <Grid className="trip-script-day-section" key={day}>
      <Box className="trip-script-day-section__header">
        <Text size="lg" className="trip-script-day-section__title">
          {"Dia " + day}
        </Text>
        <Text size="md" className="trip-script-day-section__subtitle">
          {dayDetail.date}
        </Text>
      </Box>
      <div className="trip-script-day-section__content">
        {dayDetail.actions.length ? (
          <>
            {dayDetail.actions.map((tripScriptAction, j) => {
              return (
                <TripScriptActionOrSuggestion 
                  action={tripScriptAction}
                  ignoreNotSelected={true}
                  key={j}
                >
                  {allowDelete && tripScriptAction.isEditable && (
                    <Icon
                      name="trash-2"
                      color="#D35050"
                      style={{ justifySelf: "flex-end", alignSelf: "center", marginLeft: "auto", cursor: "pointer" }}
                      onClick={() => onDelete(j)}
                    />
                  )}
                </TripScriptActionOrSuggestion>
              );
            })}
          </>
        ) : (
          <TripScriptFreeDay />
        )}
      </div>
      {
        allowMoreAttractions ? (
          <>
            <Divider/>
            <Button onClick={() => handleAddAttractions()} variant="naked" size="sm">+ Adicionar mais atrações neste dia</Button>
          </>
        ) : (<></>)
      }
    </Grid>
  );
};
