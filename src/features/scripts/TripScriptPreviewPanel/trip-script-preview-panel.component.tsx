import { EmptyState, GlobalLoader, Box, Text, SectionBase, Picture } from "@/ui";
import { useTripScriptPreview } from "./trip-script-preview.hook";
import { TripScriptActionSection } from "./trip-script-action.section";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";

export function TripScriptPreviewPanel() {
  const { isLoading, data, error } = useTripScriptPreview();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <Text as="h2" heading size="xs" className="trip-script__title">
        Prévia do roteiro
      </Text>
      {days.map((tripScriptDay, i) => {
        return (
          <SectionBase className="trip-script-day-section" columns={{ md: ["720px"], lg: ["1020px"] }} key={i}>
            <div className="trip-script-day-section__border">
              <Box className="trip-script-day-section__header">
                <Text size="lg" className="trip-script-day-section__title">
                  {"Dia " + (i + 1)}
                </Text>
                <Text size="md" className="trip-script-day-section__subtitle">
                  {tripScriptDay.date}
                </Text>
                <TripScriptDetailedDay details={tripScriptDay.details} />
              </Box>
              <div className="trip-script-day-section__content">
                <>
                  {tripScriptDay.actions.map((tripScriptAction, j) => {
                    return (
                      <TripScriptActionSection action={tripScriptAction} key={j}/>
                    )
                  })}
                </>
              </div>
            </div>
          </SectionBase>
        );
      })}
    </>
  );
}
