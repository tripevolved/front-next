import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import { Link } from "mars-ds";
import { useTripScript } from "./trip-script.hook";
import { TripScriptActionSection } from "./trip-script-action.section";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { TripScriptBlockedSection } from "./trip-script-blocked.section";
import { useRouter } from "next/router";

export function TripScriptPanel() {
  const { isLoading, data, error } = useTripScript();
  const router = useRouter();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <Box>
        <Text as="h2" heading size="xs" className="trip-script__title">
          Prévia do roteiro
        </Text>
        <Link onClick={() => router.back()}>X (VOLTAR)</Link>
      </Box>
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
      <TripScriptBlockedSection />
    </>
  );
}
