import type { TripBuilderQuestionsProps } from "./trip-builder.types";

import { TripsApiService } from "@/services/api/trip";
import { RegisterApiService } from "@/services/api";

import { useRef, useState, useEffect } from "react";
import { Card, Notification } from "mars-ds";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { RegisterCityForm } from "@/features/register/RegisterCityForm";
import { TripBuilderQuestionsForm } from "./trip-builder-form";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import { CreateTripDto } from "@/services/api/trip/create";
import { RegisterCity } from "@/services/api/register/cities";

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

export function TripBuilder({ className, children, destinationId, ...props }: TripBuilderQuestionsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  // TODO: get travelerId from appstore
  const [travelerId, setTravelerId] = useState('2228bafd-9bfc-47d5-bd54-f21942eed984');

  const router = useRouter();

  const createTrip = useRef<CreateTripDto>({} as CreateTripDto);
  const tripId = useRef<string>();

  const handleCreateTrip = (tripDto?: CreateTripDto) => {
    if (tripDto) {
      if (destinationId !== undefined) tripDto.destinationId = destinationId;
      createTrip.current = tripDto;
    }
    sendCreateTrip();
  };

  const handleRegisterCity = (cityId: string) => {
    RegisterApiService.putRegisterCity({ cityId, travelerId })
      .then(() => {
        setShowCityForm(false);
      })
      .catch(() => {
        Notification.error("Cidade inválida!");
      });
  }

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
      await router.replace(`/app/viagens/detalhes/${tripId.current}`);
    }
  };

  useEffect(() => {
    // TODO: use traveler state to define if we need to show city form or not. Also, use to show the message here
    setShowCityForm(true);
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
        ) : 
        (showCityForm ? (
            <RegisterCityForm onSubmit={handleRegisterCity} />
          )
          : (
          <TripBuilderQuestionsForm onSubmit={handleCreateTrip} />
        ))}
      </Card>
    </SectionBase>
  );
}
