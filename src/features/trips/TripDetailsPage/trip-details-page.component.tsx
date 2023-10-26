import { DestinationHeroSection } from "@/features/destinations/DestinationPage/destinations-hero.section";
import { DestinationTipsSection } from "@/features/destinations/DestinationPage//destination-tips.section";
import { TripTransportationSection } from "./trip-transportation.section";
import { TripStaySection } from "./trip-stay.section";
import { TripScriptSection } from "./trip-script.section";
import { TripFoodTipsSection } from "./trip-food-tips.section";
import { TripSupportSection } from "./trip-support.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { EmptyState, ErrorState, GlobalLoader, Text, WhatsappButton } from "@/ui";
import { PageAppBody } from "@/features/templates/PageAppBody";
import { PageAppHeader } from "@/features/templates/PageAppHeader";

import { useTripDetails } from "./trip-details.hook";
import { DestinationInfos, DestinationRecommendedBy, TripPricingBox } from "@/features";
import { Card, Container, Divider, Grid } from "mars-ds";

const MAX_REFRESH_COUNT = 5;

export function TripDetailsPage() {
  const { data, isEmpty, isLoading, refreshCount } = useTripDetails();

  if (!data || data.isBuilding) {
    return (
      <>
        <PageAppHeader backButton href="/app/painel" title="Viagem" />
        <PageAppBody>
          <div className="flex flex-column h-100 justify-content-center">
            {isEmpty ? (
              <EmptyState />
            ) : (refreshCount >= MAX_REFRESH_COUNT ?  (
              <>
                <ErrorState text="Infelizmente, houve um problema com a construção da sua viagem." />
                <Text className="text-center color-text-secondary" heading size="sm">
                  Mas pode falar conosco e vamos construir a viagem ideal para você!
                </Text>
                <Divider />
                <WhatsappButton message={`Houve um problema com minha viagem para ${data?.destination?.title}. Pode me ajudar a montar essa viagem?`}>Fale conosco</WhatsappButton>
              </>
            ) : (
              <>
                <GlobalLoader inline />
                <Text className="text-center color-text-secondary">
                  {isLoading ? "Carregando..." : "Estamos construindo sua viagem..."}
                </Text>
              </>
            ))}
          </div>
        </PageAppBody>
      </>
    );
  }

  const { destination, configuration } = data;
  const { features = [], photos = [], recommendedBy, tips = [], title } = destination;

  return (
    <>
      <DestinationHeroSection title={title} photos={photos} backButton href={`/app/painel`} />
      <TripPricingBox destinationName={destination.title} />
      <Container container="md">
        <Grid columns={{ md: "1fr 320px" }}>
          <Card className="page-app-body__card">
            <Grid growing={false}>
              {configuration ? (
                <TripConfigurationSection {...configuration} tripId={data.id} />
              ) : null}
              {features.length ? <DestinationInfos features={features} /> : null}
              {recommendedBy ? <DestinationRecommendedBy {...recommendedBy} /> : null}
            </Grid>
          </Card>
          <Card className="page-app-body__card">
          </Card>
        </Grid>
      </Container>
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      <br />
      <PageAppBody className="what-includes-section">
        <Text as="h2" heading size="sm" className="mb-2x">
          O que inclui
        </Text>
        <div className="what-includes-section__content">
          <TripTransportationSection tripId={data.id} />
          <TripStaySection tripId={data.id} />
          <TripScriptSection text={destination.description} />
          <TripFoodTipsSection text={destination.gastronomicInformation} />
          <TripSupportSection />
        </div>
      </PageAppBody>
    </>
  );
}
