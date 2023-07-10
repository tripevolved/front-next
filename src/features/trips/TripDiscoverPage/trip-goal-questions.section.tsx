import type { TripGoalQuestionProps } from "./trip-discover-page.types";

import { TripsApiService } from "@/services/api";
import { CreateTripDto } from "@/services/api/trip/create";

import { useRef, useState } from "react";
import { Card, Notification } from "mars-ds";

import { Picture, SectionBase } from "@/ui";
import { TripGoalQuestionsForm } from "./trip-goal-questions.form";

export function TripGoalQuestions({ travelerId, destinationId, onSubmit, className, children, ...props }: TripGoalQuestionProps) {
  const [submitting, setSubmitting] = useState(false);
  const createTrip = useRef<CreateTripDto>({} as CreateTripDto);
  const tripId = useRef<string>();

  const handleCreateTrip = (tripDto?: CreateTripDto) => {
    if (tripDto) {
      tripDto.travelerId = travelerId;
      if (destinationId !== undefined) tripDto.destinationId = destinationId;
      createTrip.current = tripDto;
    }
    sendCreateTrip();
    onSubmit();
  };

  const sendCreateTrip = async () => {
    try {
      setSubmitting(true);
      const result = await TripsApiService.postCreate(createTrip.current);
      tripId.current = result.id;
    } catch (error) {
      setSubmitting(false);
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
        <TripGoalQuestionsForm onSubmit={handleCreateTrip} />
      </Card>
    </SectionBase>
  );
}
