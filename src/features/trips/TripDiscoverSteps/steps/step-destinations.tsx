import { useAppStore } from "@/core/store";
import { QuestionsBuilder, type TripDiscoverStepContentProps } from "@/features";
import { useSynchronizeTravelerState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";
import { ProfileApiService, TripsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { Notification } from "mars-ds";
import { useState } from "react";

const CONTROLLER_KEY = "destination-questions";

export function StepDestinations({ onNext }: TripDiscoverStepContentProps) {
  const [submitting, setSubmitting] = useState(false);

  const travelerId = useAppStore((state) => state.travelerState.id);
  const { syncTravelerState } = useSynchronizeTravelerState();

  const handleSubmit = async (answers: AnswersDto) => {
    try {
      setSubmitting(true);
      await ProfileApiService.sendAnswersByTravelerId({ travelerId, answers });
      await syncTravelerState();
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
