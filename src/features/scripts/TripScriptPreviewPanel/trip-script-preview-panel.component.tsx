import { EmptyState, GlobalLoader, Box, Text, ErrorState } from "@/ui";
import { TripScriptPreviewDetailedDay } from "./trip-script-preview-detailed-day.section";

import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";
import { TripScriptActionOrSuggestion } from "../TripScriptPanel";
import { TripScriptFreeDay } from "../TripScriptPanel/trip-script-free-day.component";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Icon } from "mars-ds";

export function TripScriptPreviewPanel() {
  const idParam = useIdParam();

  const queryParams = new URLSearchParams(window.location.search);
  const isPreviewMode = queryParams.get("preview") === "limited";

  const fetcherKey = `trip-script-preview-${idParam}`;
  const fetcher = () => TripScriptsApiService.getPreview(idParam!);
  const { isLoading, data, error } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  const { days, isPreview } = data;

  const displayedDays = isPreviewMode ? days.slice(0, 2) : days;

  return (
    <div className="trip-script-preview">
      <div className="trip-script-preview-day-section">
        {displayedDays ? (
          displayedDays.map((tripScriptDay, i) => {
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
        {isPreviewMode && (
          <div
            style={{
              width: "100%",
              maxWidth: "850px",
              margin: "0 auto",
              display: "flex",

              zIndex: 100,
            }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)",
                borderRadius: "8px 8px 0 0",
              }}
            />

            <div
              style={{
                border: "2px dashed #0ab9ad",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                width: "100%",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "30px",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Icon name="lock" color="#0ab9ad" />
                <Text size="xl">Prossiga para o pagamento para ter acesso ao roteiro completo</Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
