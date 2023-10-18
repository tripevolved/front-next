import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import useSwr from "swr";
import { TripScriptDetailedDay } from "./trip-script-detailed-day.section";
import { useRouter } from "next/router";
import { Button } from "mars-ds";
import { TripScriptDay } from "@/core/types";
import {
  PageAppHeader,
  PageAppBody,
} from "@/features";
import { useAppStore } from "@/core/store";
import { TripScriptsApiService } from "@/services/api";
import { TripScriptActionOrSuggestion } from "./trip-script-action.component";
import { TripScriptFreeDay } from "./trip-script-free-day.component";

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
                            return TripScriptActionOrSuggestion(tripScriptAction);
                          })}
                        </>
                      ) : (
                        <TripScriptFreeDay />
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
