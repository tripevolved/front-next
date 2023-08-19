import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import useSwr from "swr";
import { TripScriptActionSection } from "./trip-script-action.section";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { useRouter } from "next/router";
import { Card, Icon, Button } from "mars-ds";
import { TripScriptAction, TripScriptDay } from "@/core/types";
import {
  AttractionsSuggestion,
  GastronomySuggestion,
  BarSuggestion,
  PartySuggestion,
  PageAppHeader,
  PageAppBody,
} from "@/features";
import { useAppStore } from "@/core/store";
import { TripScriptsApiService } from "@/services/api";

export function TripScriptPanel() {
  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;
  const fetcher = async () => TripScriptsApiService.getFull(idParam!);

  const { isLoading, data, error } = useSwr(idParam, fetcher);
  const { setTripScriptDay } = useAppStore();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  const suggestRestaurantsAndAttractions = (action: TripScriptAction) => {
    if (!action.isSelected) {
      return (
        <>
          {action.type === "RESTAURANT" && <GastronomySuggestion />}
          {action.type === "BAR" && <BarSuggestion />}
          {action.type === "PARTY" && <PartySuggestion />}
          {action.type === "EVENT" && <AttractionsSuggestion />}
        </>
      );
    }
    return <TripScriptActionSection action={action} />;
  };

  const handleEditButton = (tripDay: TripScriptDay) => {
    setTripScriptDay(tripDay);

    router.push(`/app/viagens/roteiro/atracoes/${idParam}`);
  };

  return (
    <>
      <PageAppHeader href={`/app/viagens/${idParam}`} backButton>
        <div className="trip-script-header">
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Roteiro
            </Text>
            <Text size="md">Veja todos os eventos da sua viagem</Text>
          </div>
        </div>
      </PageAppHeader>
      <PageAppBody>
        <SectionBase className="trip-script">
          <div className="trip-script-day-section">
            {days ? (
              days.map((tripScriptDay, i) => {
                return (
                  <div className="trip-script-day-section__border" key={i}>
                    <Box className="trip-script-day-section__header">
                      <Text size="lg" className="trip-script-day-section__title">
                        <span style={{ fontSize: 22, color: "var(--color-brand-1)" }}>
                          &#x2022;
                        </span>{" "}
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
                          onClick={() => handleEditButton(tripScriptDay)}
                        >
                          Editar
                        </Button>
                      )}
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
      </PageAppBody>
    </>
  );
}
