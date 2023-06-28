import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button, Icon } from "mars-ds";
import { EmptyState, Box, Text, Button as TButton } from "@/ui";

import { TransportationApiService } from "@/services/api/transportation";
import { TripPriceSection, TripPriceDetails } from "./trip-details-page.types";
import { formatByDataType } from "@/utils/helpers/number.helpers";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const MobileTripPriceSection = ({ priceList, totalValue }: TripPriceSection) => {
  const { data = [], error, isLoading } = useSwr("transportation", getByTripId, swrOptions);

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

  return (
    <Box className="mobile-trip-price-section">
      <Box className="mobile-trip-price-section__header">
        <Text heading size="xs">
          Entenda o valor
        </Text>
        <Icon size="md" name="chevron-down" />
      </Box>
      <Box className="mobile-trip-price-section__price-list">
        {priceList.map((item, i) => (
          <PriceItem {...item} key={`${item.id}-${i}`} />
        ))}
      </Box>
      <TButton backgroundColor="var(--color-brand-2)" color="var(--color-gray-4)">
        Comprar a viagem por {formatByDataType(totalValue, "CURRENCY")}
      </TButton>
    </Box>
  );
};

export type DesktopTripPriceSectionProps = TripPriceSection & {
  cityName: string;
  travelersNumber: number;
};

export const DesktopTripPriceSection = ({
  priceList,
  totalValue,
  cityName,
  travelersNumber,
}: DesktopTripPriceSectionProps) => {
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
          {priceList.map((item, i) => (
            <PriceItem {...item} key={`${item.id}-${i}`} />
          ))}
        </Box>
        <TButton backgroundColor="var(--color-brand-1)" color="var(--color-gray-4)">
          Comprar a viagem por {formatByDataType(totalValue, "CURRENCY")}
        </TButton>
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
