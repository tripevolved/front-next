import type { TripBuilderQuestionsProps } from "./trip-builder.types";

import { TripsApiService } from "@/services/api/trip";
import { useAppStore } from "@/core/store";

import { useRef, useState, useEffect } from "react";
import { Card, Notification } from "mars-ds";
import { RegisterCity } from "@/features";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { TripBuilderQuestionsForm } from "./trip-builder-form";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import { CreateTripDto } from "@/services/api/trip/create";

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Construindo sua viagem...",
    iconName: "settings",
  },
  {
    text: "Procurando atrações para seu roteiro...",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export function TripBuilder({
  className,
  children,
  destinationId,
  ...props
}: TripBuilderQuestionsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  const { travelerState } = useAppStore();

  const router = useRouter();

  const createTrip = useRef<CreateTripDto>({} as CreateTripDto);
  const tripId = useRef<string>();

  const handleCreateTrip = (tripDto?: CreateTripDto) => {
    if (tripDto) {
      tripDto.travelerId = travelerState.id;
      if (destinationId !== undefined) tripDto.destinationId = destinationId;
      createTrip.current = tripDto;
    }
    sendCreateTrip();
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

  const handleFinish = async (attempts = 3) => {
    if (attempts < 1) return; // TODO: send to error page
    if (!tripId.current) {
      await delay(1000);
      handleFinish(attempts - 1);
    } else {
      await router.replace(`/app/viagens/criar/${tripId.current}`);
    }
  };

  const handleCityRegisterFinish = () => {
    setShowCityForm(false);
  };

  useEffect(() => {
    setShowCityForm(!travelerState.hasValidAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        {submitting ? (
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
        ) : showCityForm ? (
          <RegisterCity travelerId={travelerState.id} onFinish={handleCityRegisterFinish} />
        ) : (
          <TripBuilderQuestionsForm onSubmit={handleCreateTrip} />
        )}
      </Card>
    </SectionBase>
  );
}
