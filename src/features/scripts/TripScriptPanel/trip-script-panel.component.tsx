import { EmptyState, GlobalLoader, Box, Text, SectionBase, GeneralHeader, Picture } from "@/ui";
import { useTripScript } from "./trip-script.hook";
import { TripScriptActionSection } from "./trip-script-action.section";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { useRouter } from "next/router";
import { Card, Icon } from "mars-ds";
import { TripScriptAction } from "@/core/types";
import {
  AttractionsSuggestion,
  GastronomySuggestion,
  BarSuggestion,
  PartySuggestion,
} from "@/features";

export function TripScriptPanel() {
  const { isLoading, data, error } = useTripScript();
  const router = useRouter();

  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  const suggestRestaurantsAndAttractions = (action: TripScriptAction) => {
    if (!action.isSelected) {
      return (
        <>
          <TripScriptActionSection action={action} />
          {action.type === "RESTAURANT" && <GastronomySuggestion />}
          {action.type === "BAR" && <BarSuggestion />}
          {action.type === "PARTY" && <PartySuggestion />}
          {action.type === "EVENT" && <AttractionsSuggestion />}
        </>
      );
    }
    return <TripScriptActionSection action={action} />;
  };

  return (
    <>
      <GeneralHeader backButton title="Roteiro" href={`/app/viagens/${idParam}`} />
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
                    {isPreview && <TripScriptDetailedDay details={tripScriptDay.details} />}
                  </Box>
                  <div className="trip-script-day-section__content">
                    {tripScriptDay.actions.length ? (
                      <>
                        {tripScriptDay.actions.map((tripScriptAction, j) => {
                          return suggestRestaurantsAndAttractions(tripScriptAction);
                        })}
                      </>
                    ) : (
                      <Card className="trip-script-action" elevation="xl">
                        <div className="trip-script-action__icon-box">
                          <Icon name="home" size="sm" />
                        </div>
                        <Box className="trip-script-action__box">
                          <Text size="lg" className="trip-script-action__title">
                            Dia livre
                          </Text>
                        </Box>
                      </Card>
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
    </>
  );
}
