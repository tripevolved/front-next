import { EmptyState, GlobalLoader, Box, Text, SectionBase, Picture } from "@/ui";
import { useTripScriptPreview } from "./trip-script-preview.hook";

export function TripScriptPreviewPanel() {
  const { isLoading, data, error } = useTripScriptPreview();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  console.log("LOG", days);

  // TODO: add return arrow to go back to trip
  return (
    <>
      <Text as="h2" heading size="xs" className="trip-script__title">
        Prévia do roteiro
      </Text>
      {days.map((tripScriptDay, i) => {
        return (
          <SectionBase className="trip-script-day-section" columns={{ md: ["720px"], lg: ["1020px"] }} key={i}>
            <div className="trip-script-day-section__border">
              <Text size="lg" className="trip-script-day-section__title">
                {"Dia " + (i + 1)}
              </Text>
              <Box className="trip-script-day-section__content">
                <>
                  {tripScriptDay.actions.map((tripScriptAction, j) => {
                    return (
                      <>
                        <Picture>{tripScriptAction.iconSlug}</Picture>
                        <Text size="lg" className="trip-script-action__title">
                          {tripScriptAction.title}
                        </Text>
                        <Text size="md" className="trip-script-action__subtitle">
                          {tripScriptAction.subtitle}
                        </Text>
                      </>
                    )
                  })}
                </>
              </Box>
            </div>
          </SectionBase>
        );
      })}
    </>
  );
}
