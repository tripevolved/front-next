import { TripTransportationSection } from "./trip-transportation.section";
import { TripStaySection } from "./trip-stay.section";
import { TripScriptSection } from "./trip-script.section";
import { TripFoodTipsSection } from "./trip-food-tips.section";
import { TripSupportSection } from "./trip-support.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { ErrorState, Text, WhatsappButton } from "@/ui";

import { useTripDetails } from "./trip-details.hook";
import {
  DestinationInfos,
  DestinationRecommendedBy,
  DestinationTipItem,
  Itinerary,
  PageApp,
  PageAppHero,
  TripPricingBox,
} from "@/features";
import { Card, CardElevations, Divider, Grid } from "mars-ds";
import type { Photo, PublicDestinationTip } from "@/core/types";
import { DEFAULT_CARD_IMAGE_URL } from "@/core/constants";
import { TripDetailsPageLoading } from "./trip-details-page.loading";

interface TemplateProps {
  children: React.ReactNode;
  title?: string;
  hideHeader?: boolean;
}

const DEFAULT_PHOTOS: Photo[] = [
  {
    title: "Imagem",
    sources: [{ url: DEFAULT_CARD_IMAGE_URL, height: 50, width: 1000, type: "md" }],
  },
];

export function TripDetailsPage() {
  const { data, isLoading, error } = useTripDetails();

  const Template = ({ children, title = "Sua viagem", hideHeader }: TemplateProps) => {
    return (
      <PageApp
        hideHeader={hideHeader}
        headerOptions={{ title, backUrl: "/app/painel" }}
        seo={{ title }}
      >
        {children}
      </PageApp>
    );
  };

  if (isLoading) {
    return (
      <Template>
        <TripDetailsPageLoading />
      </Template>
    );
  }

  if (error || !data) {
    return (
      <Template>
        <ErrorState
          heading="Ops, algo não saiu como esperado"
          text="Infelizmente, não foi possível construir essa viagem. Mas pode falar conosco e vamos construir a viagem ideal para você!"
        >
          <WhatsappButton
            message={`Houve um problema com minha viagem para ${data?.destination?.title}. Pode me ajudar a montar essa viagem?`}
          >
            Fale conosco
          </WhatsappButton>
        </ErrorState>
      </Template>
    );
  }

  const { destination, configuration, hasScript, isBuilding } = data;
  const { features = [], photos = DEFAULT_PHOTOS, recommendedBy, tips = [], title } = destination;
  return (
    <>
      <PageAppHero photos={photos} title={title} backUrl="/app/painel" />
      <Template title={title} hideHeader>
        <Grid columns={{ md: ["1fr", "320px"] }} growing={false}>
          <Grid>
            {configuration ? (
              <TripConfigurationSection
                {...configuration}
                tripId={data.id}
                isBuilding={isBuilding}
              />
            ) : null}
            <Itinerary tripId={data.id} />
            <Card elevation={CardElevations.Low}>
              <Grid>
                <Text as="h2" heading size="xs" className="mb-lg">
                  <strong>O que sua viagem inclui</strong>
                </Text>
                <TripTransportationSection tripId={data.id} />
                <Divider />
                <TripStaySection tripId={data.id} />
                <Divider />
                <TripScriptSection isBuilt={hasScript} />
                <Divider />
                <TripFoodTipsSection text={destination.gastronomicInformation} />
                <Divider />
                <TripSupportSection />
              </Grid>
            </Card>
            {tips.length ? <DestinationTips tips={tips} /> : null}
            {features.length ? <DestinationInfos features={features} /> : null}
            {recommendedBy ? <DestinationRecommendedBy {...recommendedBy} /> : null}
          </Grid>
          <TripPricingBox
            hasPhotos={photos.length > 0}
            destinationName={destination.title}
            numAdults={configuration.numAdults}
            numChildren={configuration.numChildren}
            isScriptBuilt={hasScript}
          />
        </Grid>
      </Template>
    </>
  );
}

const DestinationTips = ({ tips }: { tips: PublicDestinationTip[] }) => {
  return (
    <Card elevation={CardElevations.Low}>
      <Text as="h2" heading size="xs" className="mb-xl">
        <strong>Dicas do destino</strong>
      </Text>
      <Grid>
        {tips.map((props, key) => (
          <DestinationTipItem key={key} {...props} />
        ))}
      </Grid>
    </Card>
  );
};
