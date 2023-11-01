import { EmptyState, GlobalLoader, Box, Text, SectionBase, ErrorState } from "@/ui";
import useSwr from "swr";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { Button } from "mars-ds";
import { useAppStore } from "@/core/store";
import { TripScriptsApiService } from "@/services/api";
import { TripScriptActionOrSuggestion } from "./trip-script-action.component";
import { TripScriptFreeDay } from "./trip-script-free-day.component";
import { useIdParam } from "@/utils/hooks/param.hook";

export function TripScriptPanel() {
  const idParam = useIdParam();

  const fetcherKey = `trip-script-panel-${idParam}`;
  const fetcher = async () => TripScriptsApiService.getFull(idParam!);
  const { isLoading, data, error } = useSwr(fetcherKey, fetcher);
  const { setTripScriptDay } = useAppStore();

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <SectionBase className="trip-script">
      <div className="trip-script-day-section">
        {days ? (
          days.map((tripScriptDay, i) => {
            return (
              <div className="trip-script-day-section__border" key={i}>
                <Box className="trip-script-day-section__header">
                  <Text size="lg" className="trip-script-day-section__title">
                    <span style={{ fontSize: 22, color: "var(--color-brand-1)" }}>&#x2022;</span>{" "}
                    {"Dia " + (i + 1)}
                  </Text>
                  <Text size="md" className="trip-script-day-section__subtitle">
                    {tripScriptDay.date}
                  </Text>
                  {isPreview ? (
                    <TripScriptDetailedDay details={tripScriptDay.details} />
                  ) : (
                    <Button
                      size="sm"
                      variant="naked"
                      className="trip-script-day-section__edit-button"
                      iconName="edit-2"
                      href={`/app/viagens/${idParam}/roteiro/atracoes/`}
                      onClick={() => setTripScriptDay(tripScriptDay)}
                    >
                      Editar
                    </Button>
                  )}
                </Box>
                <div className="trip-script-day-section__content">
                  {tripScriptDay.actions.length ? (
                    <>
                      {tripScriptDay.actions.map((tripScriptAction, j) => {
                        return <TripScriptActionOrSuggestion action={tripScriptAction} key={j} />;
                      })}
                    </>
                  ) : (
                    <TripScriptFreeDay />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <Text>Ainda não definimos seu roteiro de viagem...</Text>
        )}
      </div>
    </SectionBase>
  );
}
