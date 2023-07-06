import { DestinationHeroSection } from "@/features/destinations/DestinationPage/destinations-hero.section";
import { DestinationInfoSection } from "@/features/destinations/DestinationPage//destination-info.section";
import { DestinationTipsSection } from "@/features/destinations/DestinationPage//destination-tips.section";
import { TripTransportationSection } from "./trip-transportation.section";
import { TripStaySection } from "./trip-stay.section";
import { TripScriptSection } from "./trip-script.section";
import { TripFoodTipsSection } from "./trip-food-tips.section";
import { TripSupportSection } from "./trip-support.section";
import { DesktopTripPriceSection, MobileTripPriceSection } from "./trip-price.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import { useTripDetails } from "./trip-details.hook";

export function TripDetailsPage() {
  const { isLoading, data, error } = useTripDetails();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { destination, configuration } = data;
  const { features = [], photos = [], recommendedBy, tips = [], title } = destination;

  return (
    <>
      <DestinationHeroSection title={title} photos={photos} />
      <DesktopTripPriceSection tripId={data.id}
        cityName={title}
        travelersNumber={2}
      />
      <TripConfigurationSection configuration={configuration} />
      <DestinationInfoSection features={features} recommendedBy={recommendedBy} />
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      <SectionBase className="what-includes-section" columns={{ md: ["720px"], lg: ["1020px"] }}>
        <div className="what-includes-section__border">
          <Text size="lg" className="what-includes-section__title">
            {"O que inclui"}
          </Text>
          <Box className="what-includes-section__content">
            <TripTransportationSection />
            <TripStaySection stars={3} />
            <TripScriptSection  text={destination.description} />
            <TripFoodTipsSection text={destination.gastronomicInformation} />
            <TripSupportSection />
          </Box>
        </div>
      </SectionBase>
      <MobileTripPriceSection tripId={data.id} />
    </>
  );
}
