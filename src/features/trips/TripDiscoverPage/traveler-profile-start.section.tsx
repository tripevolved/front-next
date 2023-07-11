import { TripDiscoverStartProps } from "./trip-discover-page.types";
import { Box, Button, Picture, SectionBase } from "@/ui";
import { Container } from "mars-ds";
import { Text } from "@/ui";

export function ProfileStartSection({ title, subtitle, onSubmit, className, children, ...props }: TripDiscoverStartProps) {
  return (
    <SectionBase container="md" className="trip-profile-start">
      <Picture alt="Figura de uma pessoa sorridente com as mãos balançando acima da cabeça" src="/assets/perfil/inicio.svg" height={375} width={375} />
      <Box className="trip-profile-start__box">
        <Container container={"xs" as any}>
          <Text className="trip-profile-start__text mb-lg" heading={true} size="xl">Olá! 👋</Text>
          <Text>
            {title ? title : "Vamos começar descobrindo o seu perfil de viajante. Responda a seguir e descubra nossas recomendações de destinos."}            
          </Text>
          <Text size="sm">
            {subtitle ? subtitle : "O perfil do viajante vai te mostrar que além de gostar de praia, você também gosta de agito ou de descanso. Além de gostar de frio, você gosta de belas paisagens e de uma culinária diferenciada. Esses detalhes fazem a viagem ser inesquecível, porque viajar não é só ir para outros lugares, mas vivenciar a experiência é que engrandece a alma e cria memórias."}
          </Text>
          <Button onClick={onSubmit} className="mt-xl" variant="custom" backgroundColor="var(--color-brand-2)" hoverBackgroundColor="var(--color-secondary-900)" color="white">
            Descobrir minha trip
          </Button>
        </Container>
      </Box>
    </SectionBase>
  );
}