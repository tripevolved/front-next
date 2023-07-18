import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import { Link } from "mars-ds";
import { useTripScriptPreview } from "./trip-script-preview.hook";
import { TripScriptPreviewActionSection } from "./trip-script-preview-action.section";
import { TripScriptPreviewDetailedDay } from "./trip-script-preview-detailed-day.section";
import { TripScriptPreviewBlockedSection } from "./trip-script-preview-blocked.section";
import { useRouter } from "next/router";

export function TripScriptPreviewPanel() {
  const { isLoading, data, error } = useTripScriptPreview();
  const router = useRouter();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <Box>
        <Text as="h2" heading size="xs" className="trip-script-preview__title">
          Prévia do roteiro
        </Text>
        <Link onClick={() => router.back()}>X (VOLTAR)</Link>
      </Box>
      {days.map((tripScriptDay, i) => {
        return (
          <SectionBase
            className="trip-script-preview-day-section"
            columns={{ md: ["720px"], lg: ["1020px"] }}
            key={i}
          >
            <div className="trip-script-preview-day-section__border">
              <Box className="trip-script-preview-day-section__header">
                <Text size="lg" className="trip-script-preview-day-section__title">
                  {"Dia " + (i + 1)}
                </Text>
                <Text size="md" className="trip-script-preview-day-section__subtitle">
                  {tripScriptDay.date}
                </Text>
                <TripScriptPreviewDetailedDay details={tripScriptDay.details} />
              </Box>
              <div className="trip-script-preview-day-section__content">
                <>
                  {tripScriptDay.actions.map((tripScriptAction, j) => {
                    return <TripScriptPreviewActionSection action={tripScriptAction} key={j} />;
                  })}
                </>
              </div>
            </div>
          </SectionBase>
        );
      })}
      <TripScriptPreviewBlockedSection />
    </>
  );
}
