import { useAppStore } from "@/core/store";
import { QuestionsBuilder, type StepComponentProps } from "@/features";
import { ProfileApiService, TripsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { Notification } from "mars-ds";
import { useState } from "react";

const CONTROLLER_KEY = "destination-questions";

export function StepDestinations({ onNext }: StepComponentProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (answers: AnswersDto) => {
    try {
      setSubmitting(true);
      const travelerId = useAppStore.getState().travelerState.id;
      await ProfileApiService.sendAnswersByTravelerId({ travelerId, answers });
      onNext();
    } catch (error) {
      Notification.error("Devido à um erro não foi possível continuar");
      setSubmitting(false);
    }
  };

  return (
    <QuestionsBuilder
      title="Descobrir minha trip"
      controller={TripsApiService.getTripDestinationQuestions}
      controllerKey={CONTROLLER_KEY}
      onSubmit={handleSubmit}
      disableLocalSave
      hideStepper
      submitting={submitting}
      finishButtonLabel="Continuar"
    />
  );
}
