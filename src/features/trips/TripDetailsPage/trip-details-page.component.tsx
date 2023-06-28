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
import { WhatsappButton, EmptyState, GlobalLoader, Box, Text, SectionBase } from "@/ui";
import { useTripDetails } from "./trip-details.hook";
import { TripPriceDetails } from "./trip-details-page.types";

const priceList: TripPriceDetails[] = [
  { id: "ujy27i862349872", title: "Total", price: 3237 },
  { id: "98749387hgvak", title: "Taxa de serviço", price: 129.48 },
];

export function TripDetailsPage() {
  const { isLoading, data, error } = useTripDetails();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined) return <EmptyState />;

  const { destination, configuration } = data;
  const { features = [], photos = [], recommendedBy, tips = [], title } = destination;
  const message = "Oi! Quero alterar minha viagem, pode me ajudar?";

  return (
    <>
      <DestinationHeroSection title={title} photos={photos} />
      <DesktopTripPriceSection
        priceList={priceList}
        cityName={title}
        travelersNumber={2}
        totalValue={3366.48}
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
            <TripScriptSection />
            <TripFoodTipsSection />
            <TripSupportSection />
          </Box>
        </div>
      </SectionBase>
      <MobileTripPriceSection priceList={priceList} totalValue={3366.48} />
      <div>
        <WhatsappButton
          className="mt-2x"
          style={{ width: 336 }}
          variant={"custom"}
          href={"#"}
          backgroundColor={"var(--color-brand-2)"}
          hoverBackgroundColor={"var(--color-secondary-900)"}
          color={"white"}
          message={message}
        >
          Quero alterar a viagem
        </WhatsappButton>
      </div>
    </>
  );
}
