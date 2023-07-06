import useSwr from "swr";

import { Loader, Button, Icon } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";

import { StaysApiService } from "@/services/api";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const { data, error, isLoading } = useSwr(tripId, getByTripId, swrOptions);

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

  if (!data) {
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
            <Box className="trip-stay-section__content">
              <div>
                <Text heading as="h4" size="xs">Ainda não escolhemos a acomodação para sua viagem.</Text>
                <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
              </div>
            </Box>
          </Box>
        </div>
      </>
    );
  }

  const generateStars = (qtd: number) => {
    const auxList = [];
    for (let index = 1; index <= qtd; index++) {
      auxList.push(<Icon size="sm" name="star" color="#f5ac0a" />);
    }
    return <>{auxList.map((icon, i) => icon)}</>;
  };

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
            <Box className="trip-stay-section__header__edit">
              <Picture src="/assets/trip/pencil.svg" />
              Editar
            </Box>
          </Box>
          <Box className="trip-stay-section__content">
            <Box className="trip-stay-section__content__stay-desc">
              <Picture src={data.coverImageUrl!} />
              <Box className="trip-stay-section__content__stay-desc__box">
                <Text>{data.name}</Text>
                <Box className="trip-stay-section__content__stay-desc__box__stars">
                  {data.tags}
                </Box>
              </Box>
            </Box>
            <Text size="xl" className="trip-stay-section__content__details-text">
              Ver detalhes
            </Text>
          </Box>
        </Box>
      </div>
      <CardHighlight className="trip-stay-highlight-box">
        <Text heading size="xs" className="trip-stay-highlight-box__title">
          Destaques da hospedagem
        </Text>
        <Box className="trip-stay-highlight-box__content">
          <Picture src="/assets/destino/pin.png" />
          <Box className="trip-stay-highlight-box__content__desc">
            <Text as="h3" heading size="xs">
              {"Localização"}
            </Text>
            <Text>
              {
                "Localizada no centro, a hospedagem oferece comodidade para visitar as principais atrações do destino."
              }
            </Text>
          </Box>
        </Box>
      </CardHighlight>
    </>
  );
};
