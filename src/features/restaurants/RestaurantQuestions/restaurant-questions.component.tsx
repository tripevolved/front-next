import { QuestionsBuilder, type StepComponentProps } from "@/features";
import { RestaurantsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { Notification } from "mars-ds";
import { useRouter } from "next/router";

export function RestaurantQuestions({ onNext }: StepComponentProps) {
  const router = useRouter();
  const tripId = String(router.query.id);

  const handleSubmit = async (restaurantParameters: AnswersDto) => {
    try {
      await RestaurantsApiService.setParameters(tripId, restaurantParameters);

      onNext();
    } catch (error) {
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  return (
    <QuestionsBuilder
      controller={() => RestaurantsApiService.getQuestions(tripId)}
      controllerKey={`restaurant-questions-${tripId}`}
      onSubmit={handleSubmit}
      disableLocalSave
      hideStepper={false}
      title="Dicas de restaurantes"
      finishButtonLabel="Encontrar restaurantes"
    />
  );
}
