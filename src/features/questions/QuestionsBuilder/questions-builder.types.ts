import { QuestionsResponse } from "@/services/api/common/questions.types";
import { AnswersDto } from "@/services/api/profile/answers";

type Controller = () => Promise<QuestionsResponse>;

export type QuestionsBuilderOnSubmit = (answers: AnswersDto) => void;

export interface QuestionsBuilderProps {
  onSubmit: QuestionsBuilderOnSubmit;
  hideStepper?: boolean;
  controllerKey: string;
  controller: Controller;
}
