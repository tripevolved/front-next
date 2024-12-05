import type { AnswersDto } from "@/services/api/profile/answers";
import type { QuestionsBuilderProps } from "./questions-builder.types";

import { useEffect, useMemo, useState } from "react";
import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";

import { Caption, Grid, Skeleton, SkeletonVariants } from "mars-ds";
import { ErrorState, StepsProgressBar } from "@/ui";

import { QuestionNavigationController } from "../QuestionNavigationController";
import { QuestionOptions } from "../QuestionOptions";
import { useAnimation } from "@/utils/hooks/animation.hook";

const swrOptions = { revalidateOnFocus: false };

export function QuestionsBuilder({
  onSubmit,
  hideStepper,
  nextButtonLabel,
  finishButtonLabel,
  controllerKey,
  controller,
  title = "Descobrir meu perfil de viajante",
  disableLocalSave,
  submitting,
}: QuestionsBuilderProps) {
  const { data = [], error, isLoading } = useSwr(controllerKey, controller, swrOptions);

  const [localAnswers, setLocalAnswers] = useLocalStorage(controllerKey);
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const animation = useAnimation();

  const total = useMemo(() => data.length - 1, [data.length]);

  const setCurrentIndexAnimation = async (index: number) => {
    animation.trigger(currentIndex < index, () => setCurrentIndex(index));
  };

  const handleSteps = (newIndex: number) => {
    if (newIndex < 0) return;
    if (total >= newIndex) setCurrentIndexAnimation(newIndex);
    else onSubmit(answers);
  };

  const handleCheck = (id: string) => (value: string | string[]) => {
    setAnswers((state: any) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const newState = { ...state, [id]: isEmptyArray ? null : value };
      if (!disableLocalSave) setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const isNextButtonDisabled = useMemo(
    () => {
      if (!Object.keys(answers).length) return true;
      return data[currentIndex]?.questions.every(({ id }) => !answers[id]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, currentIndex]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => data[currentIndex]?.questions || [], [data.length, currentIndex]);

  const isNotListedChecked = useMemo(() => {
    let filteredAnswers = {};
    const question = questions.find((question) => question.id);
    const questionId = question?.id;
    const questionsArray = questions.flatMap((question) => question.possibleAnswers);
    const isNotListedQuestion = questionsArray.find(
      (question) => question.title === "Nenhum dos listados"
    );

    const isNotListedQuestionChecked =
      (questionId &&
        isNotListedQuestion &&
        answers[questionId]?.includes(isNotListedQuestion.id)) ||
      false;

    if (isNotListedQuestionChecked && questionId) {
      const answersQuestionIds = answers[questionId] as [];
      const answersFiltered = answersQuestionIds.filter(
        (answer) => answer === isNotListedQuestion?.id
      );

      filteredAnswers = {
        [questionId]: answersFiltered,
      };

      if (JSON.stringify(answers) !== JSON.stringify(filteredAnswers)) {
        setAnswers(filteredAnswers);
      }
    }

    return !isNotListedQuestionChecked;
  }, [answers, questions]);

  useEffect(() => {
    if (disableLocalSave) return;
    const initialLocalAnswers = toJson(localAnswers);
    if (initialLocalAnswers) setAnswers(initialLocalAnswers as AnswersDto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorState retry />;

  if (isLoading) return <LoadingState />;

  return (
    <Grid gap={48} className="questions-builder">
      {hideStepper ? null : (
        <Grid gap={16}>
          <Caption as="p" className="color-text-secondary">
            {title}
          </Caption>
          <StepsProgressBar position={currentIndex} total={total} />
        </Grid>
      )}
      <main className="mb-lg">
        <div style={animation.style}>
          {questions.map((question: any) => (
            <QuestionOptions
              disabled={isNotListedChecked}
              key={question.id}
              {...question}
              onCheck={handleCheck(question.id)}
              defaultValue={answers[question.id]}
            />
          ))}
        </div>
      </main>
      <QuestionNavigationController
        style={animation.style}
        position={currentIndex}
        total={total}
        onNavigation={handleSteps}
        isNextButtonDisabled={isNextButtonDisabled}
        submitting={submitting}
        nextButtonLabel={nextButtonLabel}
        notListed={isNotListedChecked}
        finishButtonLabel={finishButtonLabel}
      />
    </Grid>
  );
}

const LoadingState = () => (
  <Grid gap={16}>
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
