import type { CreateTripProps } from "./create-trip.types";

import { TripsApiService } from "@/services/api/trip";
import { useAppStore } from "@/core/store";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";

import { useRef, useState } from "react";
import { Card, Notification, TextField, Container } from "mars-ds";

import { Picture, SectionBase, StepsLoader, Text, Box, Button } from "@/ui";
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

export function CreateTrip({
  className,
  children,
  destinationId,
  redirectTo,
  onFinish,
  ...props
}: CreateTripProps) {
  const [submitting, setSubmitting] = useState(false);
  const { travelerState } = useAppStore();

  const router = useRouter();

  const [localCreateTrip, setLocalCreateTrip] = useLocalStorage("create-trip");
  const [createTrip, setCreateTrip] = useState<CreateTripDto>({
    tripBehavior: {},
  } as CreateTripDto);

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

  const onSubmitCreateTrip = () => {
    console.log(createTrip);
    onFinish(createTrip);
  }

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
          <Box className="trip-profile-start__box">
            <Container container={"xs" as any}>
              <Text className="trip-profile-start__text mb-lg" heading={true} size="xl">Estamos quase lá! :)</Text>
              <Text>
                Para finalizar, quantas pessoas viajam com você? (incluindo você mesmo)
              </Text>
              <TextField type="number" max={4} min={1} value={2}></TextField>
              <Button onClick={onSubmitCreateTrip} className="mt-xl" variant="custom" backgroundColor="var(--color-brand-2)" hoverBackgroundColor="var(--color-secondary-900)" color="white">
                Receber minha recomendação
              </Button>
            </Container>
          </Box>
        )}
      </Card>
    </SectionBase>
  );
}
