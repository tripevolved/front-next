import type { TripDiscoverQuestionProps } from "./trip-discover-page.types";
import type { AnswersDto } from "@/services/api/profile/answers";

import { ProfileApiService } from "@/services/api/profile";

import { useRef } from "react";
import { Card, Notification } from "mars-ds";

import { Picture, SectionBase } from "@/ui";
import { DestinationQuestionsForm } from "./destination-questions.form";

export function DestinationQuestions({ travelerId, onSubmit, className, children, ...props }: TripDiscoverQuestionProps) {
  const answers = useRef<AnswersDto>({});

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) answers.current = newAnswers;
    sendAnswers();
    onSubmit();
  };

  const sendAnswers = async () => {
    try {
      const data = { answers: answers.current, travelerId };
      const result = await ProfileApiService.sendAnswersByTravelerId(data);
    } catch (error) {
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        <DestinationQuestionsForm onSubmit={handleAnswers} />
      </Card>
    </SectionBase>
  );
}
