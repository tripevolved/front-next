import { TripScriptStepInfo } from "@/core/types";
import type { StepComponentProps } from "@/features";
import { TripScriptsApiService } from "@/services/api";

import { EmptyState, ErrorState, Text } from "@/ui";
import { Button, Grid, Image, Loader } from "mars-ds";
import { useRouter } from "next/router";
import useSWR from "swr";

const SCRIPT_BUILDER_INIT = {
  title: "Oi! Vamos construir o seu roteiro de viagem?",
  subtitle:
    "As configurações a seguir nos ajudarão a montar a melhor experiência para sua viagem - mas não se preocupe, você poderá alterar o roteiro quando quiser.",
};

const ACTION_AND_STEPS: { [id: string]: { step: string, cta?: string }; } = {
  "START": { step: "parameters" },
  "SETTING_PREFERENCES": { step: "parameters" },
  "SETTING_ATTRACTIONS": { step: "init-build", cta: "Definir as atrações" },
  "SETTING_RESTAURANTS": { step: "restaurant-questions", cta: "Escolher os restaurantes" },
  "SETTING_BAR_PARTIES": { step: "finish-restaurants", cta: "Escolher os bares e festas" },
}

export function TripBuilderInitialStep({ onNext, goToStepName }: StepComponentProps) {
  const { title, subtitle } = SCRIPT_BUILDER_INIT;

  const router = useRouter();
  const tripId = String(router.query.id);

  const uniqueKeyName = `${tripId}-script-step`;
  const fetcher = async () => TripScriptsApiService.getCurrentStep(tripId);
  const { isLoading, data, error } = useSWR<TripScriptStepInfo>(uniqueKeyName, fetcher);

  const getAction = () => {
    if (error) return (<ErrorState />);
    if (isLoading) return (<Loader />);
    if (!data) return (<EmptyState />);

    const stepName = ACTION_AND_STEPS[data.step];
    return (
      <>
        <Button className="trip-script-builder-step__item" onClick={() => goToStepName(stepName.step)}>{stepName.cta ?? "Começar"}</Button>
        {stepName.cta && <Button onClick={() => onNext()} variant="naked" size="sm">Começar novamente</Button>}
      </>
    );
  }

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/map.svg"} alt="target" width={64} height={64} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      {getAction()}
    </Grid>
  );
}
