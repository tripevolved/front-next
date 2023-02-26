import { LineDecoration, Picture } from "@/components";
import { Button, Grid, Heading, SectionBase, Text } from "mars-ds";

export const SimpleSection = () => {
  return (
    <SectionBase>
      <Grid columns={{ md: 2 }} className="align-items-center">
        <Grid>
          <div>
            <Heading
              as="h1"
              size="lg"
              html="Sua trip a dois precisa<br />ser mais do que um<br />pacote pronto"
            />
            <LineDecoration />
          </div>
          <Text size="lg">
            Utilizamos tecnologia para recomendar destinos e experiências únicas. Simule e descubra
            sua trip ideal.
          </Text>
          <div>
            <Button className="mt-lg" size="md">
              Encontrar minha trip
            </Button>
          </div>
        </Grid>
        <div>
          <Picture
            style={{ maxWidth: "100%" }}
            src="https://tripevolved.com.br/assets/home/img-hero.png"
            alt="imagem"
          />
        </div>
      </Grid>
    </SectionBase>
  );
};
