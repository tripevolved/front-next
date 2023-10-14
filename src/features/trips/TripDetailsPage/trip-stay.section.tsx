import useSwr from "swr";

import { Loader, Button } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";

import { StaysApiService } from "@/services/api";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const router = useRouter();
  const setAccommdationState = useAppStore((state) => state.setAccommodation);

  const getStay = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("stay", getStay, swrOptions);

  const handleSeeDetails = () => {
    setAccommdationState({ ...data });
    router.push(`/app/viagens/criar/${tripId}/hospedagem`);
  };

  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-content-item trip-stay-section">
        <Box>
          <Picture src={"/assets/destino/hospedagem.svg"} />
        </Box>
        <Box className="trip-content-item__desc">
          <Box className="trip-stay-section__header">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Hospedagem
            </Text>
          </Box>
          <Box className="trip-stay-section__content">
            <EmptyState />
            <Button variant="neutral" onClick={() => location.reload()}>
              Tentar novamente
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  if (!data || !data.isSelected) {
    return (
      <>
        <div className="trip-content-item trip-stay-section">
          <Box>
            <Picture src={"/assets/destino/hospedagem.svg"} />
          </Box>
          <Box className="trip-content-item__desc">
            <Box className="trip-stay-section__header">
              <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
                Hospedagem
              </Text>
            </Box>
            <CardHighlight className="trip-stay-section__content">
              <div>
                <Text as="h2" size="lg">
                  Ainda não escolhemos a acomodação para sua viagem.
                </Text>
                <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
                <Button
                  iconName="home"
                  className="mt-md"
                  style={{ color: "var(--color-gray-4)", width: "100%" }}
                  href={`/app/viagens/criar/${tripId}/hospedagem/editar-hotel`}
                >
                  Escolher um Hotel
                </Button>
              </div>
            </CardHighlight>
          </Box>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="trip-content-item trip-stay-section">
        <Box className="trip-stay-section__icon">
          <Picture src={"/assets/destino/hospedagem.svg"} />
        </Box>
        <Box className="trip-content-item__desc">
          <Box className="trip-stay-section__header">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Hospedagem
            </Text>
            <Button
              iconName="edit-2"
              variant="naked"
              size="sm"
              style={{ color: "var(--color-gray-1)" }}
              href={`/app/viagens/criar/${tripId}/hospedagem/editar-hotel`}
            >
              Editar
            </Button>
          </Box>
          <Box className="trip-stay-section__content">
            <Box className="trip-stay-section__content__stay-desc">
              <Picture src={data.coverImageUrl ? data.coverImageUrl : "/assets/blank-image.png"} />
              <Box className="trip-stay-section__content__stay-desc__box">
                <Text size="lg">{data.name}</Text>
                <Box className="trip-stay-section__content__stay-desc__box__stars">{data.tags}</Box>
              </Box>
            </Box>
            <Button
              variant="naked"
              className="trip-stay-section__content__details-text"
              onClick={() => handleSeeDetails()}
            >
              Ver detalhes
            </Button>
          </Box>
          {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
        </Box>
      </div>
    </>
  );
};
