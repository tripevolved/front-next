import { DestinationHeroSection } from "@/features/destinations/DestinationPage/destinations-hero.section";
import { DestinationTipsSection } from "@/features/destinations/DestinationPage//destination-tips.section";
import { TripTransportationSection } from "./trip-transportation.section";
import { TripStaySection } from "./trip-stay.section";
import { TripScriptSection } from "./trip-script.section";
import { TripFoodTipsSection } from "./trip-food-tips.section";
import { TripSupportSection } from "./trip-support.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { EmptyState, GlobalLoader, Text } from "@/ui";
import { PageAppBody } from "@/features/templates/PageAppBody";
import { PageAppHeader } from "@/features/templates/PageAppHeader";

import { useTripDetails } from "./trip-details.hook";
import { DestinationInfos, DestinationRecommendedBy, TripPricingBox } from "@/features";
import { Card, Container, Grid } from "mars-ds";

export function TripDetailsPage() {
  const { data, isEmpty, isLoading } = useTripDetails();

  if (!data) {
    return (
      <>
        <PageAppHeader backButton href="/app/painel" title="Viagem" />
        <PageAppBody>
          <div className="flex flex-column h-100 justify-content-center">
            {isEmpty ? (
              <EmptyState />
            ) : (
              <>
                <GlobalLoader inline />
                <Text className="text-center color-text-secondary">
                  {isLoading ? "Carregando..." : "Aguarde enquanto a sua viagem está sendo criada"}
                </Text>
              </>
            )}
          </div>
        </PageAppBody>
      </>
    );
  }

  const { destination, configuration } = data;
  const { features = [], photos = [], recommendedBy, tips = [], title } = destination;

  return (
    <>
      <DestinationHeroSection title={title} photos={photos} />
      <PageAppHeader backButton href="/app/painel" title="Voltar" />
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
            <TripPricingBox destinationName={destination.title} />
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
