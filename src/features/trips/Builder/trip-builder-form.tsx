import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { useState, useMemo, useEffect } from "react";
import { EmptyState, StepsProgressBar } from "@/ui";
import { OptionsQuestionItem, SliderQuestionItem, DatePickerQuestionItem  } from "@/features/questions";
import { ProfileQuestionsNavigation } from "@/features/profile/ProfileQuestions/profile-questions-navigation";

import { TripsApiService } from "@/services/api/trip";
import type { AnswersDto } from "@/services/api/profile/answers";

export interface TripBuilderQuestionsFormProps {
  onSubmit: (answers: AnswersDto) => void;
}

const swrOptions = { revalidateOnFocus: false };
const { getTripOnboardingQuestions, getTripQuestions } = TripsApiService;

export const TripBuilderQuestionsForm = ({ onSubmit }: TripBuilderQuestionsFormProps) => {
  const { data = [], error, isLoading } = useSwr("tripQuestions", getTripQuestions, swrOptions);

  const [localAnswers, setLocalAnswers] = useLocalStorage("trip-answers");
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = useMemo(() => data.length - 1, [data.length]);

  const style: any = useMemo(() => ({ "--position": currentIndex }), [currentIndex]);

  const handleSteps = (newIndex: number) => {
    if (newIndex < 0) return;
    if (total >= newIndex) setCurrentIndex(newIndex);
    else onSubmit(answers);
  };

  const handleCheck = (id: string) => (value: string | string[] | number) => {
    setAnswers((state: any) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const newState = { ...state, [id]: isEmptyArray ? null : value };
      setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const handleDateChange = (id: string) => (value: [Date, Date]) => {
    setAnswers((state: any) => {
      const newState = { ...state, [id]: value };
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
          Descobrir minha trip
        </Caption>
        <StepsProgressBar position={currentIndex} total={total} />
      </div>
      <main className="profile-questions__group mb-lg" style={style}>
        {data.map(({ page, questions = [] }, index) => (
          <div key={page}>
            {questions.map((question) => {
              const hasRangeField = question.type === "RANGE";
              const hasCalendar = question.type === "DATEPICK";
              return hasRangeField ? (
                <SliderQuestionItem
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  minValue={question.minValue}
                  maxValue={question.maxValue}
                  step={question.step}
                  dataType={question.dataType}
                  defaultValue={answers[question.id]}
                  onSet={handleCheck(question.id)}
                />
              ) : (hasCalendar ? (
                <DatePickerQuestionItem
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  defaultValue={answers[question.id]}
                  onSet={handleDateChange(question.id)}
                />
              ) : (
                <OptionsQuestionItem
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  onCheck={handleCheck(question.id)}
                  defaultValue={answers[question.id]}
                />
              ));
            }
            )}
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
