import type { TripGoalQuestionProps } from "./trip-discover-page.types";

import { Card } from "mars-ds";

import { Picture, SectionBase } from "@/ui";
import { TripGoalQuestionsForm } from "./trip-goal-questions.form";

export function TripGoalQuestions({ travelerId, destinationId, onSubmit, className, children, ...props }: TripGoalQuestionProps) {
  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        <TripGoalQuestionsForm onSubmit={onSubmit} />
      </Card>
    </SectionBase>
  );
}
