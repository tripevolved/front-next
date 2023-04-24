import { jsonToString, toJson } from "@/helpers/json.helpers";
import { useLocalStorage } from "@/hooks/local-storage.hooks";
import { ProfileApiService } from "@/services/api/profile";
import { Grid, Caption, Loader } from "mars-ds";
import { useState, useMemo, useEffect } from "react";
import { EmptyState, StepsProgressBar } from "@/components";
import { ProfileQuestionsItem } from "./profile-question-item";
import { ProfileQuestionsNavigation } from "./profile-questions-navigation";
import { AnswersDto } from "@/services/api/profile/answers";
import { useFetch } from "@/hooks/fetch.hook";
import { ProfileQuestionsResponse } from "@/services/api/profile/questions";

export interface ProfileQuestionsFormProps {
  onSubmit: (answers: AnswersDto) => void;
}

export const ProfileQuestionsForm = ({ onSubmit }: ProfileQuestionsFormProps) => {
  const {
    data: inheritedData,
    error,
    isLoading,
  } = useFetch<ProfileQuestionsResponse>("questions", ProfileApiService.getQuestions);

  const [localAnswers, setLocalAnswers] = useLocalStorage("travel-profile-answers");
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = useMemo(() => inheritedData || [], [inheritedData])

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

  const isNextButtonDisabled = () => data[currentIndex]?.questions.every(({ id }) => !answers[id]);

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
      <div className="profile-questions-form">
        <EmptyState />
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
              <ProfileQuestionsItem
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
          isNextButtonDisabled={isNextButtonDisabled()}
        />
      </div>
    </Grid>
  );
};
