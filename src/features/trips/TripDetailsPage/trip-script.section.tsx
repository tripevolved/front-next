import { Box, Text, Picture, CardHighlight, Tag } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid, Link } from "mars-ds";

interface TripScriptSectionProps {
  isBuilt?: boolean;
}

export const TripScriptSection = ({ isBuilt = false }: TripScriptSectionProps) => {
  const idParam = useIdParam();

  return (
    <div className="trip-content-item trip-script-section">
      <Box>
        <Picture src={"/assets/destino/roteiro.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Box className="trip-script-section__header">
          <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
            Roteiro
          </Text>
          <Link
            className="trip-script-section__see-script"
            variant="primary"
            style={{ marginTop: 0 }}
            href={`/app/viagens/${idParam}/roteiro/previa/`}
          >
            <Text size="lg">Ver prévia do roteiro</Text>
          </Link>
        </Box>
        <Grid columns={3}>
          <Box className="trip-script-section__highlight">
            <Picture src="/assets/script/map.svg" />
            <Text size="md">
              Seu roteiro com cada experiência pensada para o seu perfil de viajante
            </Text>
          </Box>
          <Box className="trip-script-section__highlight">
            <Picture src="/assets/script/restaurant-highlight.svg" />
            <Text size="md">O melhor da gastronomia com o que você prefere</Text>
          </Box>
          <Box className="trip-script-section__highlight">
            <Picture src="/assets/script/drink.svg" />
            <Text size="md">Quer curtir? Os melhores bares, festas e eventos à sua disposição</Text>
          </Box>
        </Grid>
        {!isBuilt && (
          <CardHighlight className="trip-highlight-box">
            <Text size="lg">
              Vamos construir seu roteiro junto com você, recomendando as melhores experiências para
              o seu perfil e objetivo de viagem!
            </Text>
            <Button variant="secondary" size="sm">
              Construir meu roteiro
            </Button>
          </CardHighlight>
        )}
      </Box>
    </div>
  );
};
