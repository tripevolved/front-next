import type { CreateTripProps } from "./create-trip.types";

import { TripsApiService } from "@/services/api/trip";
import { useAppStore } from "@/core/store";

import { useRef, useState } from "react";
import { Card, Notification } from "mars-ds";
import { useAfterLoginState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import { CreateTripDto } from "@/services/api/trip/create";
import { CreateTripForm } from "./create-trip.form";

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

export function CreateTrip({
  className,
  children,
  destinationId,
  redirectTo,
  ...props
}: CreateTripProps) {
  const [submitting, setSubmitting] = useState(false);
  const { travelerState } = useAppStore();
  const { travelerStateGet } = useAfterLoginState();

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
      travelerStateGet();
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
      await router.replace(redirectTo + tripId.current);
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
        {submitting ? (
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
        ) : (
          <CreateTripForm redirectTo={redirectTo} onFinish={handleCreateTrip} />
        )}
      </Card>
    </SectionBase>
  );
}
