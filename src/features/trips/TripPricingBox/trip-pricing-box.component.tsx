import useSWR from "swr";
import { Picture, Text } from "@/ui";
import {
  Button,
  Card,
  CardElevations,
  Divider,
  Grid,
  Icon,
  Skeleton,
  SkeletonVariants,
  Modal,
} from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import ToggleButton from "@/ui/components/buttons/ToggleButton/toggle-button.component";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { PendingDocumentsModal } from "@/features";

interface TripPricingBoxProps {
  destinationName: string;
  numAdults: number;
  numChildren?: number;
  isScriptBuilt?: boolean;
  hasPhotos?: boolean;
}

export const TripPricingBox = ({
  destinationName,
  numAdults = 2,
  numChildren = 0,
  isScriptBuilt,
  hasPhotos,
}: TripPricingBoxProps) => {
  const idParam = useIdParam();

  const fetcherKey = `trip-pricing-${idParam}`;
  const fetcher = async () => TripsApiService.getPriceById(idParam);
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher);

  if (error) return <TripPricingBoxErrorState title={destinationName} />;
  if (isLoading) return <TripPricingBoxLoadingState />;
  if (!data) return <TripPricingBoxErrorState title={destinationName} />;

  const people = numChildren
    ? `Para ${numAdults} adultos e ${numChildren} crianças`
    : `Para ${numAdults} adultos`;

  return (
    <div className={makeCn("trip-pricing-box", { "trip-pricing-box--offset": hasPhotos })()}>
      <div className="trip-pricing-box-spacer" />
      <TripPricingBoxToggle title={destinationName} total={data.total} />
      <Card className="trip-pricing-box__card" elevation={CardElevations.Low}>
        <TripPricingBoxContent
          tripId={idParam}
          title={destinationName}
          description={data.description || undefined}
          people={people}
          price={data.price}
          serviceFee={data.serviceFee}
          total={data.total}
          isPaid={data.isPaid}
          isBuilt={!!isScriptBuilt}
        />
      </Card>
    </div>
  );
};

const TripPricingBoxToggle = ({
  title,
  total,
}: Pick<TripPricingBoxContentProps, "title" | "total">) => (
  <Card
    as="button"
    elevation={CardElevations.Medium}
    className="trip-pricing-box-toggle theme-dark"
    onClick={() => {
      document.body.dataset.pricingBox = "opened";
    }}
  >
    <Grid>
      <Grid columns={["1fr", "auto", "24px"]} className="align-items-start">
        <Text heading as="h2" size="xs">
          {title}
        </Text>
        <Text as="strong" heading size="xs">
          {formatToCurrencyBR(total)}
        </Text>
        <Icon className="trip-pricing-box-toggle__icon" name="chevron-up" />
      </Grid>
      <Button>Comprar viagem</Button>
    </Grid>
  </Card>
);

interface TripPricingBoxContentProps {
  title: string;
  description?: string;
  people: string;
  price: number;
  serviceFee: number;
  total: number;
  isPaid: boolean;
  isBuilt: boolean;
  tripId: string;
}

const TRIP_INCLUDES = [
  { text: "Transporte", image: "/assets/destino/passagem-aerea.svg" },
  { text: "Hospedagem", image: "/assets/destino/hospedagem.svg" },
  { text: "Roteiro", image: "/assets/destino/roteiro.svg" },
  { text: "Dicas gastronômicas", image: "/assets/destino/dicas-gastronomicas.svg" },
  { text: "Suporte 360°", image: "/assets/destino/suporte.svg" },
];

const TripPricingBoxContent = ({
  tripId,
  title,
  description,
  people,
  price,
  serviceFee,
  total,
  isPaid,
  isBuilt,
}: TripPricingBoxContentProps) => (
  <div className="trip-pricing-box-content">
    <ToggleButton
      className="trip-pricing-box-content__close_button"
      iconName="x"
      onClick={() => {
        document.body.dataset.pricingBox = "closed";
      }}
    />
    <TripPricingBoxContentHeader title={title} people={people} />
    <Grid>
      <Text heading as="h3" size="xs">
        <strong>
          <small>O que inclui</small>
        </strong>
      </Text>
      <Grid gap={12} className="px-md">
        {TRIP_INCLUDES.map((item, key) => (
          <TripPricingBoxContentItem key={key} {...item} />
        ))}
      </Grid>
      <Divider />
      <Grid className="px-md">
        <TripPricingBoxContentPrice label="Total" value={price} />
        <TripPricingBoxContentPrice label="Taxa" value={serviceFee} />
      </Grid>
      <TripPricingBoxContentCta isBuilt={isBuilt} isPaid={isPaid} total={total} tripId={tripId} />
      {description ? (
        <Text size="sm" className="color-text-secondary px-md">
          *{description}
        </Text>
      ) : null}
    </Grid>
  </div>
);

const TripPricingBoxContentHeader = ({
  title,
  people,
}: Pick<TripPricingBoxContentProps, "title" | "people">) => (
  <div className="flex-grow">
    <Text heading as="h2" className="mb-sm">
      {title}
    </Text>
    <Grid columns={["auto", "1fr"]} className="color-text-secondary mb-xl">
      <Icon name="users" size="sm" />
      <Text size="sm">{people}</Text>
    </Grid>
  </div>
);

const TripPricingBoxContentCta = ({
  isPaid,
  isBuilt,
  tripId,
  total,
}: Pick<TripPricingBoxContentProps, "tripId" | "total" | "isPaid" | "isBuilt">) => {
  const router = useRouter();
  if (isPaid) return <Button disabled>A viagem já está paga.</Button>;

  const handleModal = () => {
    const buyHref = `/app/viagens/${tripId}/comprar`;

    const modal = Modal.open(
      () => (
        <PendingDocumentsModal
          tripId={tripId}
          title="Dados dos Viajantes"
          onFinish={() => {
            modal.close();
            router.push(buyHref);
          }}
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };

  const BuyButton = ({ isPrimary = false }) => (
    <Button variant={isPrimary ? "tertiary" : "neutral"} onClick={() => handleModal()}>
      Comprar por {formatToCurrencyBR(total)}
    </Button>
  );

  if (isBuilt) return <BuyButton isPrimary />;

  return (
    <Grid>
      <Button variant={"tertiary" as any} href={`/app/viagens/${tripId}/roteiro/configurar/`}>
        Construir meu roteiro
      </Button>
      <BuyButton />
      <Text size="sm" className="px-md">
        <strong>Não se preocupe:</strong> você poderá construir o roteiro em um momento posterior
      </Text>
    </Grid>
  );
};

const TripPricingBoxContentPrice = ({ label, value }: { label: string; value: number }) => (
  <div className="flex align-items-center justify-content-between">
    <Text as="span" className="color-text-secondary">
      {label}
    </Text>
    <Text as="strong" style={{ marginTop: 0 }}>
      {formatToCurrencyBR(value)}
    </Text>
  </div>
);

const TripPricingBoxContentItem = ({ text, image }: { text: string; image: string }) => (
  <Grid columns={["auto", "1fr"]} className="color-primary align-items-center">
    <Picture src={image} height={32} width={32} />
    <Text size="lg">{text}</Text>
  </Grid>
);

const TripPricingBoxLoadingState = () => (
  <Card elevation={CardElevations.Medium}>
    <Grid>
      <Skeleton active height={24} />
      <Skeleton active height={12} width={128} />
      <Skeleton active variant={SkeletonVariants.Paragraph} />
      <Skeleton active height={48} />
    </Grid>
  </Card>
);

const TripPricingBoxErrorState = ({ title }: Pick<TripPricingBoxContentProps, "title">) => (
  <Card elevation={CardElevations.Medium}>
    <Grid>
      <Text heading as="h2">
        {title}
      </Text>
      <Text>Devido à um erro não foi possível mostrar os preços</Text>
      <Button iconName="refresh-ccw" variant="neutral" onClick={location.reload}>
        Tentar novamente
      </Button>
    </Grid>
  </Card>
);
