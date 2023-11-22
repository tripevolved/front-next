import type { StepComponentProps, QuestionsBuilderOnSubmit } from "@/features";

import { useState } from "react";
import { useAppStore } from "@/core/store";

import { ProfileApiService } from "@/services/api/profile";

import { Notification } from "mars-ds";
import { QuestionsBuilder } from "@/features";
import { StepsLoader } from "@/ui";

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

export function StepBuildProfile({ onNext }: StepComponentProps) {
  const email = useAppStore((state) => state.user.email);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: QuestionsBuilderOnSubmit = async (answers) => {
    setSubmitting(true);
    try {
      const { profileSlug } = await ProfileApiService.sendAnswers({ answers, email });
      useAppStore.getState().leadUpdate({ profile: { slug: profileSlug } });
    } catch (error) {
      Notification.error("Devido à um erro não foi possível salvar as suas respostas");
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    setSubmitting(false);
    onNext();
  };

  if (submitting) {
    return <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />;
  }

  return (
    <QuestionsBuilder
      controller={ProfileApiService.getQuestions}
      controllerKey={CONTROLLER_KEY}
      onSubmit={handleSubmit}
    />
  );
}
