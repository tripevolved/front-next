import { TripConfigurationSection } from "./trip-configuration.section";
import { ErrorState, Text, WhatsappButton } from "@/ui";

import { useTripDetails } from "./trip-details.hook";
import { DestinationTipItem, NewItinerary, PageApp, PageAppHero, TripPricingBox } from "@/features";
import { Card, CardElevations, Grid, ToggleButton } from "mars-ds";
import type { Photo, PublicDestinationTip } from "@/core/types";
import { DEFAULT_CARD_IMAGE_URL } from "@/core/constants";
import { TripDetailsPageLoading } from "./trip-details-page.loading";
import { useAppStore } from "@/core/store";

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
  const { username, email } = useAppStore((state) => state.user);
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

  if (isLoading || !data) {
    return (
      <Template>
        <TripDetailsPageLoading />
      </Template>
    );
  }

  if (!data) {
    return <></>;
  }

  if (error) {
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
  const { photos = DEFAULT_PHOTOS, title } = destination;

  return (
    <>
      <PageAppHero photos={photos} title={title} backUrl="/app/painel" />
      <Template title={title} hideHeader>
        <div className="trip-stay-header">
          <ToggleButton
            className="page-app-header__backButton"
            variant="neutral"
            iconName="x"
            title="Fechar"
            href="/app/painel"
            style={{ border: "none" }}
          />
        </div>
        <div className="trip-stay-content">
          <div className="trip-stay-center-margin">
            <Grid
              columns={{ md: ["1fr", "320px"] }}
              growing={false}
              className="trip-stay-center-margin"
              style={{ gap: 80 }}
            >
              <Grid>
                {configuration ? (
                  <TripConfigurationSection
                    {...configuration}
                    tripId={data.id}
                    isBuilding={isBuilding}
                  />
                ) : null}
                <NewItinerary tripId={data.id} title={title} />
              </Grid>
              <TripPricingBox
                hasPhotos={photos.length > 0}
                destinationName={destination.title}
                numAdults={configuration.numAdults}
                numChildren={configuration.numChildren}
                isScriptBuilt={hasScript}
                messageProps={{
                  budget: configuration.budget,
                  formattedDates: configuration.formattedDates,
                  travelersNumber: configuration.numAdults + configuration.numChildren,
                  tripName: destination.title,
                  username,
                  email,
                }}
              />
            </Grid>
          </div>
        </div>
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
