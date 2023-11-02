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

    const encodedRedirect = encodeURIComponent(`/app/viagens/${tripId}/roteiro/construcao/?stepName=build&day=${day}`);
    router.push(`/app/viagens/${tripId}/roteiro/atracoes?redirectTo=${encodedRedirect}`);
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
            {dayDetail.actions.map((tripScriptAction, key) => {
              return (
                <TripScriptActionOrSuggestion
                  action={tripScriptAction}
                  ignoreNotSelected={true}
                  key={key}
                >
                  {allowDelete && onDelete && tripScriptAction.isEditable && (
                    <Icon
                      name="trash-2"
                      color="#D35050"
                      style={{ justifySelf: "flex-end", alignSelf: "center", marginLeft: "auto", cursor: "pointer" }}
                      onClick={() => onDelete(key)}
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
