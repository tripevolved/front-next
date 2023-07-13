import type { TripBuilderStartProps } from "./trip-builder.types";
import { Box, Picture, SectionBase } from "@/ui";
import { Button, Container } from "mars-ds";
import { Text } from "@/ui";

export function TripBuilderStartSection({ destinationName, onSubmit, className, children, ...props }: TripBuilderStartProps) {
  return (
    <SectionBase container="md" className="trip-profile-start">
      <Picture alt="Figura de uma pessoa sorridente com as mãos balançando acima da cabeça" src="/assets/perfil/inicio.svg" height={375} width={375} />
      <Box className="trip-profile-start__box">
        <Container container={"xs" as any}>
          <Text className="trip-profile-start__text mb-lg" heading={true} size="xl">Vamos para {destinationName}?</Text>
          <Text>
            Agora, vamos entender os detalhes da sua viagem para que você tenha a melhor experiência, preparada para você.
          </Text>
          <Button onClick={onSubmit} className="mt-xl" variant="custom" backgroundColor="var(--color-brand-2)" hoverBackgroundColor="var(--color-secondary-900)" color="white">
            Descobrir minha trip
          </Button>
        </Container>
      </Box>
    </SectionBase>
  );
}
