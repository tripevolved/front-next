import type { TripDiscoverStepContentProps, QuestionsBuilderOnSubmit } from "@/features";
import type { TravelerProfileType } from "@/core/types";

import { useState } from "react";
import { useAppStore } from "@/core/store";

import { ProfileApiService } from "@/services/api/profile";

import { Button, Grid, Notification } from "mars-ds";
import { QuestionsBuilder, HasProfile } from "@/features";
import { StepsLoader, Text } from "@/ui";

const CONTROLLER_KEY = "travel-profile-answers";
const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Montando o seu perfil...",
    iconName: "settings",
  },
  {
    text: "Achamos 3 lugares para você curtir",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export function StepBuildProfile({ onNext }: TripDiscoverStepContentProps) {
  const email = useAppStore((state) => state.user.email);
  const leadUpdate = useAppStore((state) => state.leadUpdate);

  const [submitting, setSubmitting] = useState(false);
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfileType | null>(null);

  const handleSubmit: QuestionsBuilderOnSubmit = async (answers) => {
    setSubmitting(true);
    try {
      const { profileSlug } = await ProfileApiService.sendAnswers({ answers, email });
      leadUpdate({ profile: { slug: profileSlug } });
      setTravelerProfile(profileSlug as TravelerProfileType);
    } catch (error) {
      Notification.error("Devido à um erro não foi possível salvar as suas respostas");
      console.error(error);
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <StepsLoader
        steps={STEPS}
        milliseconds={MILLISECONDS}
        onFinish={() => setSubmitting(false)}
      />
    );
  }

  if (travelerProfile) {
    return (
      <Grid className="text-center">
        <HasProfile travelerProfile={travelerProfile} />
        <Text className="color-text-secondary">
          Agora que já sabemos qual é o seu perfil de viajante, clique em continuar para descobrir a
          sua trip:
        </Text>
        <Button
          // @ts-ignore
          variant="tertiary"
          iconName="chevron-right"
          isRtl
          onClick={onNext}
        >
          Continuar
        </Button>
      </Grid>
    );
  }

  return (
    <QuestionsBuilder
      controller={ProfileApiService.getQuestions}
      controllerKey={CONTROLLER_KEY}
      onSubmit={handleSubmit}
      hideStepper
    />
  );
}
