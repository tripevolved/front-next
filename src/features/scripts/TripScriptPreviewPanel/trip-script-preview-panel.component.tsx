import { EmptyState, GlobalLoader, Box, Text, SectionBase, GeneralHeader } from "@/ui";
import { useTripScriptPreview } from "./trip-script-preview.hook";
import { TripScriptPreviewActionSection } from "./trip-script-preview-action.section";
import { TripScriptPreviewDetailedDay } from "./trip-script-preview-detailed-day.section";
import { TripScriptPreviewBlockedSection } from "./trip-script-preview-blocked.section";
import { useRouter } from "next/router";

export function TripScriptPreviewPanel() {
  const { isLoading, data, error } = useTripScriptPreview();
  const router = useRouter();

  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <GeneralHeader backButton title="Prévia do Roteiro" href={`/app/viagens/criar/${idParam}`} />
      <SectionBase className="trip-script-preview">
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
                    <>
                      {tripScriptDay.actions.map((tripScriptAction, j) => {
                        return (
                          tripScriptAction.isSelected && (
                            <TripScriptPreviewActionSection action={tripScriptAction} key={j} />
                          )
                        );
                      })}
                    </>
                  </div>
                </div>
              );
            })
          ) : (
            <Text> Ainda não difinimos seu roteiro de viagem...</Text>
          )}
        </div>
        <TripScriptPreviewBlockedSection />
      </SectionBase>
    </>
  );
}
