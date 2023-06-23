import { DestinationHeroSection } from "@/features/destinations/DestinationPage/destinations-hero.section";
import { DestinationInfoSection } from "@/features/destinations/DestinationPage//destination-info.section";
import { DestinationTipsSection } from "@/features/destinations/DestinationPage//destination-tips.section";
import { TripTransportationSection } from "./trip-transportation.section";
import { TripStaySection } from "./trip-stay.section";
import { TripScriptSection } from "./trip-script.section";
import { TripFoodTipsSection } from "./trip-food-tips.section";
import { TripSupportSection } from "./trip-support.section";
import { TripPriceSection } from "./trip-price.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { WhatsappButton, EmptyState, GlobalLoader } from "@/ui";
import { useTripDetails } from "./trip-details.hook";

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
      <TripConfigurationSection configuration={configuration} />
      <DestinationInfoSection features={features} recommendedBy={recommendedBy} />
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      <TripTransportationSection />
      <TripStaySection />
      <TripScriptSection />
      <TripFoodTipsSection />
      <TripSupportSection />
      <TripPriceSection />
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
