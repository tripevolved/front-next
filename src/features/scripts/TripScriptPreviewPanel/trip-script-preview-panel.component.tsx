import { EmptyState, GlobalLoader, Box, Text, ErrorState } from "@/ui";
import { TripScriptPreviewDetailedDay } from "./trip-script-preview-detailed-day.section";

import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";
import { TripScriptActionOrSuggestion } from "../TripScriptPanel";
import { TripScriptFreeDay } from "../TripScriptPanel/trip-script-free-day.component";
import { useIdParam } from "@/utils/hooks/param.hook";

export function TripScriptPreviewPanel() {
  const idParam = useIdParam();

  const fetcher = () => TripScriptsApiService.getPreview(idParam!);
  const fetcherKey = `trip-script-preview-${idParam}`;
  const { isLoading, data, error } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <div className="trip-script-preview">
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
                  {isPreview && <TripScriptPreviewDetailedDay details={tripScriptDay.details} />}
                </Box>
                <div className="trip-script-preview-day-section__content">
                  {tripScriptDay.actions.some((action) => action.isSelected) ? (
                    tripScriptDay.actions.map((tripScriptAction, j) => {
                      return (
                        tripScriptAction.isSelected && (
                          <TripScriptActionOrSuggestion
                            ignoreNotSelected={true}
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
