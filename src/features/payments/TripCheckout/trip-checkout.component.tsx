import { TripScriptSection } from "@/features/trips/TripDetailsPage/trip-script.section";
import { TripFoodTipsSection } from "@/features/trips/TripDetailsPage/trip-food-tips.section";
import { TripSupportSection } from "@/features/trips/TripDetailsPage/trip-support.section";
import { Box, EmptyState, ErrorState, LoaderState, Text, WhatsappButton } from "@/ui";

import { useTripDetails } from "@/features/trips/TripDetailsPage/trip-details.hook";
import { Divider, Grid, Link, ToggleSwitch } from "mars-ds";
import { TripDestinationCheckoutSection } from "./trip-checkout-destination.section";
import { TripCheckoutTransportationSection } from "./trip-checkout-transportation.section";
import { TripCheckoutStaySection } from "./trip-checkout-stay.section";
import { TripCheckoutPricingSection } from "./trip-checkout-pricing.section";
import { useState } from "react";

export function TripCheckout() {
  const { data, isLoading, error } = useTripDetails();
  const [conditions, setConditions] = useState<boolean>(false);

  if (error) {
    return (
      <>
        <ErrorState text="Infelizmente, houve um problema com a construção da sua viagem." />
        <Text className="text-center color-text-secondary" heading size="sm">
          Mas pode falar conosco e vamos construir a viagem ideal para você!
        </Text>
        <Divider />
        <WhatsappButton
          message={`Houve um problema com minha viagem para ${data?.destination?.title}. Pode me ajudar a montar essa viagem?`}
        >
          Fale conosco
        </WhatsappButton>
      </>
    );
  }

  if (isLoading) return <LoaderState />;

  if (!data) return <EmptyState />;

  const { destination, configuration, hasScript } = data;
  const peopleInfo = `Para ${configuration.numAdults} adultos${
    configuration.numChildren && configuration.numChildren > 0
      ? ` e ${configuration.numChildren} crianças`
      : ""
  }`;

  return (
    <Grid className="trip-checkout" columns={1}>
      <Box className="trip-checkout__includes">
        <div className="trip-checkout__includes-content">
          <Text as="h2" heading size="sm" className="mb-2x">
            Resumo da sua viagem
          </Text>
          <TripDestinationCheckoutSection
            configuration={configuration}
            destination={destination}
            peopleInfo={peopleInfo}
          />
          <TripCheckoutTransportationSection tripId={data.id} peopleInfo={peopleInfo} />
          <TripCheckoutStaySection tripId={data.id} />
          <TripScriptSection isBuilt={hasScript} />
          <TripFoodTipsSection text={destination.gastronomicInformation} />
          <TripSupportSection />
        </div>
        <Box className="trip-checkout__terms-and-conditions">
          <Text heading size="sm">
            Condições gerais do serviço
          </Text>
          <Box className="trip-checkout__terms-and-conditions-item">
            <Text size="lg" style={{ fontWeight: "bold" }}>
              Regras gerais
            </Text>
            <Text>
              A <span style={{ fontWeight: "bold" }}>Trip Evolved</span> é uma plataforma de
              intermediação e todos os serviços, como transporte, hospedagem, eventos, ingressos e
              tíquetes são prestados por fornecedores terceiros, independentes e com regras
              próprias. Tanto o viajante como a Trip Evolved estão submetidos às regras dos
              fornecedores escolhidos.
            </Text>
          </Box>
          <Box className="trip-checkout__terms-and-conditions-item">
            <Text size="lg" style={{ fontWeight: "bold" }}>
              Detalhes da viagem
            </Text>
            <Text>
              Antes de prosseguir com qualquer compra, a{" "}
              <span style={{ fontWeight: "bold" }}>Trip Evolved</span> recomenda que o viajante faça
              uma checagem minuciosa de todos os serviços selecionados, especialmente a data de ida,
              data de volta, origem, destino, meio de transporte, serviços extras, nome, CPF,
              e-mail, dados de contato dos viajantes e dados de pagamento.
            </Text>
          </Box>
          <Box className="trip-checkout__terms-and-conditions-item">
            <Text size="lg" style={{ fontWeight: "bold" }}>
              Alterações e cancelamentos
            </Text>
            <Text>
              Havendo alterações ou cancelamentos na programação da viagem, essas serão comunicadas
              pelos fornecedores por escrito ao viajante, nos meios de comunicação informados no
              momento da compra. No atendimento personalizado da{" "}
              <span style={{ fontWeight: "bold" }}>Trip Evolved</span>, a nossa equipe também
              entrará em contato para informar sobre as mudanças, que são de responsabilidade
              exclusiva dos fornecedores.
            </Text>
          </Box>
          <Link
            target="_blank"
            href={`https://prismic-io.s3.amazonaws.com/tripevolved/ab71717b-b954-432a-9d14-07938fdbb3a4_Condic%CC%A7o%CC%83es+Gerais+do+Servic%CC%A7o+-+Trip+Evolved+-+2.0.pdf`}
            iconName="external-link"
          >
            <Text size="xl">Ver o documento completo</Text>
          </Link>
          <ToggleSwitch
            label={"Li e aceito as condições gerais do serviço"}
            defaultChecked={false}
            onChange={setConditions}
          />
        </Box>
      </Box>
      <TripCheckoutPricingSection isEnabled={conditions} />
    </Grid>
  );
}
