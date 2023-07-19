import type { AnswersDto } from "@/services/api/profile/answers";
import type { QuestionsBuilderProps } from "./questions-builder.types";

import { useEffect, useMemo, useState } from "react";
import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";

import { Button, Caption, Grid, Skeleton, SkeletonVariants } from "mars-ds";
import { EmptyState, StepsProgressBar } from "@/ui";

import { QuestionNavigationController } from "../QuestionNavigationController";
import { QuestionOptions } from "../QuestionOptions";

const swrOptions = { revalidateOnFocus: false };

export function QuestionsBuilder({
  onSubmit,
  hideStepper,
  controllerKey,
  controller,
}: QuestionsBuilderProps) {
  const { data = [], error, isLoading } = useSwr(controllerKey, controller, swrOptions);

  const [localAnswers, setLocalAnswers] = useLocalStorage(controllerKey);
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = useMemo(() => data.length - 1, [data.length]);

  const handleSteps = (newIndex: number) => {
    if (newIndex < 0) return;
    if (total >= newIndex) setCurrentIndex(newIndex);
    else onSubmit(answers);
  };

  const handleCheck = (id: string) => (value: string | string[]) => {
    setAnswers((state: any) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const newState = { ...state, [id]: isEmptyArray ? null : value };
      setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const isNextButtonDisabled = useMemo(
    () => data[currentIndex]?.questions.every(({ id }) => !answers[id]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, currentIndex]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => data[currentIndex]?.questions || [], [data.length, currentIndex]);

  useEffect(() => {
    const initialLocalAnswers = toJson(localAnswers);
    if (initialLocalAnswers) setAnswers(initialLocalAnswers as AnswersDto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Grid>
        <Skeleton active height={24} />
        <br />
        <Skeleton active variant={SkeletonVariants.Paragraph} />
        <br />
        <Skeleton active height={24} />
        <Skeleton active height={24} />
        <Skeleton active height={24} />
        <Skeleton active height={24} />
        <Skeleton active height={24} />
        <br />
        <Grid columns={3}>
          <Skeleton active height={48} />
          <Skeleton active height={48} />
        </Grid>
      </Grid>
    );
  }

  if (error)
    return (
      <EmptyState>
        <Button variant="neutral" iconName="rotate-ccw" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </EmptyState>
    );

  return (
    <Grid gap={48}>
      {hideStepper ? null : (
        <Grid gap={16}>
          <Caption as="p" className="color-text-secondary">
            Descobrir meu perfil de viajante
          </Caption>
          <StepsProgressBar position={currentIndex} total={total} />
        </Grid>
      )}
      <main className="mb-lg">
        <div>
          {questions.map((question: any) => (
            <QuestionOptions
              key={question.id}
              {...question}
              onCheck={handleCheck(question.id)}
              defaultValue={answers[question.id]}
            />
          ))}
        </div>
      </main>
      <QuestionNavigationController
        position={currentIndex}
        total={total}
        onNavigation={handleSteps}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </Grid>
  );
}
