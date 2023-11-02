import useSwr from "swr";

import { Loader, Button, Modal } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";

import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { TripStayDetails } from "@/features";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const router = useRouter();

  const getStay = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("stay", getStay, swrOptions);

  const handleSeeDetails = () => {
    const modal = Modal.open(
      () => (
        <TripStayDetails
          stayData={data!}
          tripId={tripId}
          router={router}
          onCloseModal={() => modal.close()}
        />
      ),
      {
        closable: true,
        size: "lg",
      }
    );
  };

  if (error || isLoading) {
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
            {error && (
              <>
                <EmptyState />
                <Button variant="neutral" onClick={() => location.reload()}>
                  Tentar novamente
                </Button>
              </>
            )}
            {isLoading && (
              <div style={{textAlign: "center"}}>
                <Loader color="var(--color-brand-1)" size="md" />
              </div>
            )}
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
