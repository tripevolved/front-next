import { QuestionsResponse } from "@/services/api/common/questions.types";
import { AnswersDto } from "@/services/api/profile/answers";

type Controller = () => Promise<QuestionsResponse>;

export type QuestionsBuilderOnSubmit = (answers: AnswersDto) => void;

export interface QuestionsBuilderProps {
  title?: string;
  onSubmit: QuestionsBuilderOnSubmit;
  onPrevious?: () => void;
  controllerKey: string;
  controller: Controller;
  disableLocalSave?: boolean;
  submitting?: boolean;
  hideStepper?: boolean;
  nextButtonLabel?: string;
  finishButtonLabel?: string;
  showPreviousButton?: boolean;
}
