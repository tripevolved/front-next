import { EmptyState, GlobalLoader, Box, Text, ErrorState } from "@/ui";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";

import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";
import { TripScriptActionOrSuggestion } from "../TripScriptPanel";
import { TripScriptFreeDay } from "../TripScriptPanel/trip-script-free-day.component";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid } from "mars-ds";

export function TripScriptPanel() {
  const idParam = useIdParam();

  const fetcherKey = `trip-script-preview-${idParam}`;
  const fetcher = () => TripScriptsApiService.getPreview(idParam!);
  const { isLoading, data, error } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  const { days } = data;

  return (
    <div className="trip-script-preview">
      <Grid columns={[13, 1]}>
        <div>
          <Text size="xl">Aqui, você pode pode ver como ficou seu roteiro, dia a dia.</Text>
          <Text size="sm">Você ainda pode editá-lo, se quiser.</Text>
        </div>
        <Button
          iconName="edit"
          variant="naked"
          size="sm"
          href={`/app/viagens/${idParam}/roteiro/configurar?vindoDe=dashboard`}
        >
          Editar
        </Button>
      </Grid>
      <div className="trip-script-preview-day-section">
        {days ? (
          days.map((tripScriptDay, i) => {
            return (
              <div className="trip-script-preview-day-section__border" key={i}>
                <Box className="trip-script-preview-day-section__header">
                  <Text size="lg" className="trip-script-preview-day-section__title">
                    <span style={{ fontSize: 22, color: "var(--color-brand-1)" }}>&#x2022;</span>{" "}
                    {"Dia " + (i + 1)}
                  </Text>
                  <Text size="md" className="trip-script-preview-day-section__subtitle">
                    {tripScriptDay.date}
                  </Text>
                  {/* TODO: this modal needs to be visually organized 
                  <TripScriptDetailedDay details={tripScriptDay.details} /> */}
                </Box>
                <div className="trip-script-preview-day-section__content">
                  {tripScriptDay.actions.some((action) => action.isSelected) ? (
                    tripScriptDay.actions.map((tripScriptAction, j) => {
                      return (
                        tripScriptAction.isSelected && (
                          <TripScriptActionOrSuggestion
                            ignoreNotSelected={false}
                            action={tripScriptAction}
                            key={j}
                          />
                        )
                      );
                    })
                  ) : (
                    <TripScriptFreeDay />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <Text> Ainda não definimos seu roteiro de viagem...</Text>
        )}
      </div>
    </div>
  );
}
