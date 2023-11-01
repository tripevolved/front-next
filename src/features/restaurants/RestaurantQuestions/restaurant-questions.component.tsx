import { QuestionsBuilder, type StepComponentProps } from "@/features";
import { RestaurantsApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Notification } from "mars-ds";

export function RestaurantQuestions({ onNext }: StepComponentProps) {
  const idParam = useIdParam();

  const handleSubmit = async (restaurantParameters: AnswersDto) => {
    try {
      await RestaurantsApiService.setParameters(idParam, restaurantParameters);
      onNext();
    } catch (error) {
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  return (
    <QuestionsBuilder
      controller={() => RestaurantsApiService.getQuestions(idParam)}
      controllerKey={`restaurant-questions-${idParam}`}
      onSubmit={handleSubmit}
      disableLocalSave
      hideStepper={false}
      title="Dicas de restaurantes"
      finishButtonLabel="Encontrar restaurantes"
    />
  );
}
