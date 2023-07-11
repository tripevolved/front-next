import type { CreateTripFormProps } from "./create-trip.types";
import { jsonToString, toJson } from "@/utils/helpers/json.helpers";

import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";

import { useState, useEffect } from "react";
import { TextField, Container } from "mars-ds";

import { Text, Box, Button } from "@/ui";
import { CreateTripDto } from "@/services/api/trip/create";

export function CreateTripForm({
  className,
  children,
  destinationId,
  redirectTo,
  onFinish,
  ...props
}: CreateTripFormProps) {
  const [localCreateTrip, setLocalCreateTrip] = useLocalStorage("create-trip");
  const [createTrip, setCreateTrip] = useState<CreateTripDto>({
    tripBehavior: {},
  } as CreateTripDto);
  
  const handleSubmit = () => {    
    onFinish(createTrip);
  };
  
  useEffect(() => {
    const initialCreateTrip = toJson(localCreateTrip);
    if (initialCreateTrip) setCreateTrip(initialCreateTrip as CreateTripDto);
    else {
      var tripInfo = {} as CreateTripDto;
      setLocalCreateTrip(jsonToString(tripInfo));
      setCreateTrip(tripInfo);
    }
  }, []);

  return (
    <Box className="trip-profile-start__box">
      <Container container={"xs" as any}>
        <Text className="trip-profile-start__text mb-lg" heading={true} size="xl">Estamos quase lá! :)</Text>
        <Text>
            Para finalizar, quantas pessoas viajam com você? (incluindo você mesmo)
        </Text>
        <TextField type="number" max={4} min={1} value={2}></TextField>
        <Button onClick={handleSubmit} className="mt-xl" variant="custom" backgroundColor="var(--color-brand-2)" hoverBackgroundColor="var(--color-secondary-900)" color="white">
            Receber minha recomendação
        </Button>
      </Container>
    </Box>
  );
}
