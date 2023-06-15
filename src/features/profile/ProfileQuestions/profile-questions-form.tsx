import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { useState, useMemo, useEffect } from "react";
import { EmptyState, StepsProgressBar } from "@/ui";
import { QuestionOptions } from "@/features/questions/QuestionOptions";
import { ProfileQuestionsNavigation } from "./profile-questions-navigation.component";

import { ProfileApiService } from "@/services/api/profile";
import type { AnswersDto } from "@/services/api/profile/answers";

export interface ProfileQuestionsFormProps {
  onSubmit: (answers: AnswersDto) => void;
}

const swrOptions = { revalidateOnFocus: false };
const { getQuestions } = ProfileApiService;

export const ProfileQuestionsForm = ({ onSubmit }: ProfileQuestionsFormProps) => {
  const { data = [], error, isLoading } = useSwr("questions", getQuestions, swrOptions);

  const [localAnswers, setLocalAnswers] = useLocalStorage("travel-profile-answers");
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = useMemo(() => data.length - 1, [data.length]);

  const style: any = useMemo(() => ({ "--position": currentIndex }), [currentIndex]);

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

  useEffect(() => {
    const initialLocalAnswers = toJson(localAnswers);
    if (initialLocalAnswers) setAnswers(initialLocalAnswers as AnswersDto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error)
    return (
      <div className="profile-questions-form flex-column gap-lg">
        <EmptyState />
        <Button variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );

  return (
    <Grid gap={48}>
      <div className="profile-questions__header">
        <Caption as="p" className="mb-lg profile-questions__caption">
          Descobrir meu perfil de viajante
        </Caption>
        <StepsProgressBar position={currentIndex} total={total} />
      </div>
      <main className="profile-questions__group mb-lg" style={style}>
        {data.map(({ page, questions = [] }, index) => (
          <div key={page}>
            {questions.map((question) => (
              <QuestionOptions
                key={question.id}
                {...question}
                disabled={index !== currentIndex}
                onCheck={handleCheck(question.id)}
                defaultValue={answers[question.id]}
              />
            ))}
          </div>
        ))}
      </main>
      <div className="profile-questions__footer">
        <ProfileQuestionsNavigation
          position={currentIndex}
          total={total}
          onNavigation={handleSteps}
          isNextButtonDisabled={isNextButtonDisabled}
        />
      </div>
    </Grid>
  );
};
