import { QuestionsBuilder, type StepComponentProps } from "@/features";
import { TripsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";

export function StepTripGoal({ onNext, onPrevious }: StepComponentProps) {
  const handleSubmit = async (tripBehavior: AnswersDto) => {
    onNext({ tripBehavior });
  };

  return (
    <QuestionsBuilder
      controller={TripsApiService.getTripQuestions}
      controllerKey="trip-goal"
      onSubmit={handleSubmit}
      finishButtonLabel="Continuar"
      disableLocalSave
      hideStepper
      showPreviousButton={true}
      onPrevious={onPrevious}
    />
  );
}
