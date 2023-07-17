import { EmptyState, GlobalLoader, Box, Text, SectionBase, GeneralHeader } from "@/ui";
import { useTripScript } from "./trip-script.hook";
import { TripScriptActionSection } from "./trip-script-action.section";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { useRouter } from "next/router";

export function TripScriptPanel() {
  const { isLoading, data, error } = useTripScript();
  const router = useRouter();

  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <GeneralHeader backButton title="Roteiro" href={`/app/viagens/${idParam}`} />
      <SectionBase className="trip-script">
        {days.map((tripScriptDay, i) => {
          return (
            <div className="trip-script-day-section" key={i}>
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
                      return <TripScriptActionSection action={tripScriptAction} key={j} />;
                    })}
                  </>
                </div>
              </div>
            </div>
          );
        })}
      </SectionBase>
    </>
  );
}
