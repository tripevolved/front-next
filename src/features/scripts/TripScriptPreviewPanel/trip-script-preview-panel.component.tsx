import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import { TripScriptPreviewDetailedDay } from "./trip-script-preview-detailed-day.section";
import { useRouter } from "next/router";
import { PageAppHeader } from "@/features/templates/PageAppHeader";
import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";
import { PageAppBody } from "@/features/templates/PageAppBody";
import { TripScriptActionOrSuggestion } from "../TripScriptPanel";

export function TripScriptPreviewPanel() {
  const router = useRouter();

  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetcher = () => TripScriptsApiService.getPreview(idParam!);
  const { isLoading, data, error } = useSwr(idParam, fetcher);

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { days, isPreview } = data;

  return (
    <>
      <PageAppHeader backButton title="Prévia do Roteiro" href={`/app/viagens/criar/${idParam}`} />
      <PageAppBody className="trip-script-preview">
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
                            <TripScriptActionOrSuggestion ignoreNotSelected={true} action={tripScriptAction} key={j} />
                          )
                          );
                        })}
                    </>
                  </div>
                </div>
              );
            })
            ) : (
              <Text> Ainda não definimos seu roteiro de viagem...</Text>
              )}
        </div>
      </PageAppBody>
    </>
  );
}
