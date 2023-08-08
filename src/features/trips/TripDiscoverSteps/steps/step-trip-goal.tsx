import { QuestionsBuilder, type TripDiscoverStepContentProps } from "@/features";
import { TripsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";

export function StepTripGoal({ onNext }: TripDiscoverStepContentProps) {
  const handleSubmit = async (tripBehavior: AnswersDto) => {
    onNext({ tripBehavior });
  };

  return (
    <QuestionsBuilder
      controller={TripsApiService.getTripQuestions}
      controllerKey="trip-goal"
      onSubmit={handleSubmit}
      disableLocalSave
      hideStepper
    />
  );
}
