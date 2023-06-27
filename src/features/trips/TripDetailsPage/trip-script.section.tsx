import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { EmptyState, Box, Text, Picture } from "@/ui";

import { TransportationApiService } from "@/services/api/transportation";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripScriptSection = () => {
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
    <div className="trip-content-item trip-script-section">
      <Box>
        <Picture src={"/assets/destino/roteiro.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Roteiro
        </Text>
        <Text className="trip-script-section__text">
          {
            "A cidade possui um rico patrimônio histórico, cultural e artístico, sendo considerada Patrimônio Cultural da Humanidade pela UNESCO desde 1980. Entre suas principais atrações estão a Igreja de São Francisco de Assis, considerada uma das obras-primas do barroco brasileiro."
          }
        </Text>
        <Text size="xl" className="trip-script-section__see-script" style={{ marginTop: 0 }}>
          Ver prévia do roteiro
        </Text>
      </Box>
    </div>
  );
};
