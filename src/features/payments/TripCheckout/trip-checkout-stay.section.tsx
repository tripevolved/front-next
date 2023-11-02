import useSwr from "swr";

import { Loader, Button, Modal } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";

import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { TripStayDetails } from "@/features";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

export const TripCheckoutStaySection = ({ tripId }: { tripId: string }) => {
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
          isModalView
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
                  Sua viagem não tem acomodação escolhida.
                </Text>
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
          </Box>
          <Box className="trip-stay-section__content">
            <Text size="lg"></Text>
            <Box className="trip-stay-section__content__stay-desc">
              <Picture src={data.coverImageUrl ? data.coverImageUrl : "/assets/stays/empty.svg"} />
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
        </Box>
      </div>
    </>
  );
};
