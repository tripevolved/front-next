import { TripScriptSection } from "@/features/trips/TripDetailsPage/trip-script.section";
import { TripFoodTipsSection } from "@/features/trips/TripDetailsPage/trip-food-tips.section";
import { TripSupportSection } from "@/features/trips/TripDetailsPage/trip-support.section";
import { Box, EmptyState, ErrorState, GlobalLoader, Text, WhatsappButton } from "@/ui";

import { useTripDetails } from "@/features/trips/TripDetailsPage/trip-details.hook";
import { DestinationInfos, DestinationRecommendedBy, TripPricingBox } from "@/features";
import { Card, Container, Divider, Grid } from "mars-ds";
import { TripDestinationCheckoutSection } from "./trip-checkout-destination.section";
import { TripCheckoutTransportationSection } from "./trip-checkout-transportation.section";
import { TripCheckoutStaySection } from "./trip-checkout-stay.section";

const MAX_REFRESH_COUNT = 5;

export function TripCheckout() {
  const { data, isEmpty, isLoading, refreshCount } = useTripDetails();

  if (!data || data.isBuilding) {
    return (
      // TODO: no container here
      <div className="flex flex-column h-100 justify-content-center">
        {isEmpty ? (
          <EmptyState />
        ) : refreshCount >= MAX_REFRESH_COUNT ? (
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
        ) : (
          <>
            <GlobalLoader inline />
            <Text className="text-center color-text-secondary">
              {isLoading ? "Carregando..." : "Estamos construindo sua viagem..."}
            </Text>
          </>
        )}
      </div>
    );
  }

  const { destination, configuration, hasScript } = data;
  const { features = [], photos = [], recommendedBy, tips = [], title } = destination;
  const peopleInfo = `Para ${configuration.numAdults} adultos${configuration.numChildren && configuration.numChildren > 0 ? ` e ${configuration.numChildren} crianças` : ""}`;

  return (
    <>
      <TripPricingBox
        destinationName={destination.title}
        numAdults={configuration.numAdults}
        numChildren={configuration.numChildren}
        isScriptBuilt={hasScript}
      />
      <Box className="what-includes-section">
        <Text as="h2" heading size="sm" className="mb-2x">
          Resumo da sua viagem
        </Text>
        <div className="what-includes-section__content">
          <TripDestinationCheckoutSection  configuration={configuration} destination={destination} peopleInfo={peopleInfo} />
          <TripCheckoutTransportationSection tripId={data.id} peopleInfo={peopleInfo} />
          <TripCheckoutStaySection tripId={data.id} />
          <TripScriptSection isBuilt={hasScript} />
          <TripFoodTipsSection text={destination.gastronomicInformation} />
          <TripSupportSection />
        </div>
      </Box>
    </>
  );
}
