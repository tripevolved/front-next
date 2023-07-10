import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { useState, useMemo, useEffect } from "react";
import { EmptyState, StepsProgressBar } from "@/ui";

import { TripsApiService } from "@/services/api/trip";
import { CreateTripDto } from "@/services/api/trip/create";
import {
  QuestionDatePicker,
  QuestionOptions,
  QuestionNavigationController,
  QuestionSlider,
} from "@/features";

export interface TripBuilderQuestionsFormProps {
  onSubmit: (trip: CreateTripDto) => void;
}

const swrOptions = { revalidateOnFocus: false };
const { getTripQuestions } = TripsApiService;

export const TripBuilderQuestionsForm = ({ onSubmit }: TripBuilderQuestionsFormProps) => {
  const { data = [], error, isLoading } = useSwr("tripQuestions", getTripQuestions, swrOptions);

  const [localAnswers, setLocalAnswers] = useLocalStorage("trip-answers");
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const [localCreateTrip, setLocalCreateTrip] = useLocalStorage("create-trip");
  const [createTrip, setCreateTrip] = useState<CreateTripDto>({
    tripBehavior: {},
  } as CreateTripDto);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = useMemo(() => data.length - 1, [data.length]);
  const style: any = useMemo(() => ({ "--position": currentIndex }), [currentIndex]);

  const handleSteps = (newIndex: number) => {
    if (newIndex < 0) return;
    if (total >= newIndex) setCurrentIndex(newIndex);
    else onSubmit(createTrip);
  };

  const handleCheck = (id: string) => (value: string | string[]) => {
    setCreateTrip((state: any) => {
      const tripInfo = state as CreateTripDto;
      if (tripInfo.tripBehavior === undefined) tripInfo.tripBehavior = {};

      const isEmptyArray = Array.isArray(value) && value.length === 0;
      if (!isEmptyArray) tripInfo.tripBehavior[id] = value as string[];

      setLocalCreateTrip(jsonToString(tripInfo));
      return tripInfo;
    });
    setAnswers((state: any) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const newState = { ...state, [id]: isEmptyArray ? null : true };
      setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const handleSlider = (id: string, dataType: "CURRENCY" | "DAYS" | undefined) => (value: number) => {
    setCreateTrip((state: any) => {
      const tripInfo = state as CreateTripDto;

      if (dataType === undefined) return tripInfo;

      if (dataType === "CURRENCY") createTrip.maxBudget = value;
      else createTrip.days = value;

      setLocalCreateTrip(jsonToString(tripInfo));
      return tripInfo;
    });
    setAnswers((state: any) => {
      const newState = { ...state, [id]: true };
      setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const handleDateChange = (id: string) => (value: [Date, Date]) => {
    setCreateTrip((state: any) => {
      const tripInfo = state as CreateTripDto;
    
      tripInfo.dates = value;

      setLocalCreateTrip(jsonToString(tripInfo));
      return tripInfo;
    });
    setAnswers((state: any) => {
      const newState = { ...state, [id]: true };
      setLocalAnswers(jsonToString(newState));
      return newState;
    });
  };

  const isNextButtonDisabled = useMemo(
    () => data[currentIndex]?.questions.every(({ id }) => answers[id] === false || answers[id] === undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, currentIndex]
  );

  useEffect(() => {
    const initialCreateTrip = toJson(localCreateTrip);
    if (initialCreateTrip) setCreateTrip(initialCreateTrip as CreateTripDto);
    else {
      var tripInfo = {} as CreateTripDto;
      setLocalCreateTrip(jsonToString(tripInfo));
      setCreateTrip(tripInfo);
    }

    const initialLocalAnswers = toJson(localAnswers);
    if (initialLocalAnswers) setAnswers(initialLocalAnswers as Record<string, boolean>);
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
                <QuestionSlider
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  minValue={question.minValue}
                  maxValue={question.maxValue}
                  step={question.step}
                  dataType={question.dataType}
                  defaultValue={
                    question.dataType === "CURRENCY" ? createTrip.maxBudget : createTrip.days
                  }
                  onSet={handleSlider(question.id, question.dataType)}
                />
              ) : hasCalendar ? (
                <QuestionDatePicker
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  dates={createTrip.dates}
                  onSet={handleDateChange(question.id)}
                />
              ) : (
                <QuestionOptions
                  key={question.id}
                  {...question}
                  disabled={index !== currentIndex}
                  defaultValue={
                    createTrip.tripBehavior === undefined
                      ? undefined
                      : createTrip.tripBehavior[question.id]
                  }
                  onCheck={handleCheck(question.id)}
                />
              );
            })}
          </div>
        ))}
      </main>
      <div className="profile-questions__footer">
        <QuestionNavigationController
          position={currentIndex}
          total={total}
          onNavigation={handleSteps}
          isNextButtonDisabled={isNextButtonDisabled}
        />
      </div>
    </Grid>
  );
};
