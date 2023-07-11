import { Loader, Button, Icon } from "mars-ds";
import { EmptyState, Box, Text, Button as TButton, WhatsappButton } from "@/ui";
import { TripPriceDetails } from "./trip-details-page.types";

import { formatByDataType } from "@/utils/helpers/number.helpers";
import { TripPrice } from "@/core/types";

export const MobileTripPriceSection = ({ isLoading, priceData, error }: { isLoading: boolean, priceData: TripPrice, error: boolean }) => {
  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-questions-form flex-column gap-lg">
        <EmptyState />
        <Button variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  const total = priceData?.price! + priceData?.serviceFee!;

  return (
    <Box className="mobile-trip-price-section">
      <Box className="mobile-trip-price-section__header">
        <Text heading size="xs">
          Entenda o valor
        </Text>
        <Icon size="md" name="chevron-down" />
      </Box>
      <Box className="mobile-trip-price-section__price-list">
        <PriceItem title="Total" price={priceData?.price!} />
        <PriceItem title="Taxa de serviço" price={priceData?.serviceFee!} />
        {priceData?.description ?
          <Text className="mobile-trip-price-section__price-description">
            *{priceData?.description}
          </Text> : null}
      </Box>
      <TButton backgroundColor="var(--color-brand-2)" color="var(--color-gray-4)">
        Comprar a viagem por {formatByDataType(total, "CURRENCY")}
      </TButton>
      <WhatsappButton
        style={{ width: "100%", color: "var(--color-brand-2)" }}
        size="sm"
        variant={"text"}
        href={"#"}
        hoverBackgroundColor={"var(--color-secondary-900)"}
      >
        {"Quero alterar a viagem"}
      </WhatsappButton>
    </Box>
  );
};

export type DesktopTripPriceSectionProps = {
  isLoading: boolean;
  priceData: TripPrice;
  error: boolean
  cityName: string;
  travelersNumber: number;
};

export const DesktopTripPriceSection = ({
  isLoading,
  priceData,
  error,
  cityName,
  travelersNumber,
}: DesktopTripPriceSectionProps) => {
  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-questions-form flex-column gap-lg">
        <EmptyState />
        <Button variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  const total = priceData?.price! + priceData?.serviceFee!;

  return (
    <Box className="desktop-trip-price-section">
      <Box className="mobile-trip-price-section" style={{ display: "flex" }}>
        <Box className="mobile-trip-price-section__header" style={{ flexDirection: "column" }}>
          <Text heading size="xs">
            {cityName}
          </Text>
          <Text>Para {travelersNumber} pessoas</Text>
        </Box>
        <Box className="mobile-trip-price-section__price-list">
          <PriceItem title="Total" price={priceData?.price!} />
          <PriceItem title="Taxa de serviço" price={priceData?.serviceFee!} />
          {priceData.description ?
            <Text className="mobile-trip-price-section__price-description">
              *{priceData.description}
            </Text> : null}
        </Box>
        <TButton backgroundColor="var(--color-brand-1)" color="var(--color-gray-4)">
          Comprar a viagem por {formatByDataType(total, "CURRENCY")}
        </TButton>

        <WhatsappButton
          style={{ width: "100%", color: "var(--color-brand-1)" }}
          size="sm"
          variant={"text"}
          href={"#"}
          hoverBackgroundColor={"var(--color-secondary-900)"}
        >
          {"Quero alterar a viagem"}
        </WhatsappButton>
      </Box>
    </Box>
  );
};

const PriceItem = ({ title, price }: TripPriceDetails) => (
  <Box className="mobile-trip-price-section__price-list__price-item">
    <Text size="lg" className="label">
      {title}
    </Text>
    <Text size="lg" style={{ marginTop: 0 }}>
      {formatByDataType(price, "CURRENCY")}
    </Text>
  </Box>
);
