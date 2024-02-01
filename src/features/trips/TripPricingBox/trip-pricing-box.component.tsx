import useSWR from "swr";
import { HoverTooltipCard, Picture, Text } from "@/ui";
import {
  Button,
  Card,
  CardElevations,
  Divider,
  Grid,
  Icon,
  ItemButton,
  Skeleton,
  SkeletonVariants,
} from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import ToggleButton from "@/ui/components/buttons/ToggleButton/toggle-button.component";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";

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
  const { availableFeatures } = useAppStore((state) => state.travelerState);
  const allowScriptBuilder = availableFeatures.includes("SCRIPT");
  const allowPurchase = availableFeatures.includes("PURCHASE");

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
      <TripPricingBoxToggle
        title={destinationName}
        total={data.amountWithDiscount ?? data.amount}
        isPurchaseAvailable={allowPurchase}
      />
      <Card className="trip-pricing-box__card" elevation={CardElevations.Low}>
        <TripPricingBoxContent
          tripId={idParam}
          title={destinationName}
          description={data.description || undefined}
          people={people}
          price={data.price}
          serviceFee={data.serviceFee}
          total={data.amountWithDiscount ?? data.amount}
          isPaid={data.isPaid}
          isScriptBuilt={!!isScriptBuilt}
          isScriptAvailable={allowScriptBuilder}
          tripIncludes={data.includes}
          isPurchaseAvailable={allowPurchase}
        />
      </Card>
    </div>
  );
};

const TripPricingBoxToggle = ({
  title,
  total,
  isPurchaseAvailable,
}: Pick<TripPricingBoxContentProps, "title" | "total" | "isPurchaseAvailable">) => (
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
      {isPurchaseAvailable ? (
        <Button>Comprar viagem</Button>
      ) : (
        <HoverTooltipCard text="A compra ainda não está disponível online. Fale conosco e ajustamos tudo para você.">
          <Button iconName="lock" disabled style={{ width: "100%" }}>
            Comprar viagem
          </Button>
        </HoverTooltipCard>
      )}
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
  isScriptBuilt: boolean;
  isScriptAvailable: boolean;
  tripId: string;
  tripIncludes: { title: string; slug: string | null }[];
  isPurchaseAvailable: boolean;
}

const TripPricingBoxContent = ({
  tripId,
  title,
  description,
  people,
  price,
  serviceFee,
  total,
  isPaid,
  isScriptBuilt,
  isScriptAvailable,
  isPurchaseAvailable,
  tripIncludes,
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
        {tripIncludes.map((item, key) => (
          <TripPricingBoxContentItem
            key={key}
            image={`/assets/destino/${item.slug}.svg`}
            text={item.title}
          />
        ))}
      </Grid>
      <Divider />
      <Grid className="px-md">
        <TripPricingBoxContentPrice label="Total" value={price} />
        <TripPricingBoxContentPrice label="Taxa" value={serviceFee} />
      </Grid>
      <TripPricingBoxContentCta
        isScriptBuilt={isScriptBuilt}
        isScriptAvailable={isScriptAvailable}
        isPaid={isPaid}
        total={total}
        tripId={tripId}
        isPurchaseAvailable={isPurchaseAvailable}
      />
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
  isScriptBuilt,
  isScriptAvailable,
  isPurchaseAvailable,
  tripId,
  total,
}: Pick<
  TripPricingBoxContentProps,
  "tripId" | "total" | "isPaid" | "isScriptBuilt" | "isScriptAvailable" | "isPurchaseAvailable"
>) => {
  if (isPaid) return <Button disabled>A viagem já está paga.</Button>;

  const BuyButton = ({ isPrimary = false, isPurchaseAvailable = true }) =>
    isPurchaseAvailable ? (
      <Button variant={isPrimary ? "tertiary" : "neutral"} href={`/compra/${tripId}/`}>
        Comprar por {formatToCurrencyBR(total)}
      </Button>
    ) : (
      <HoverTooltipCard text="A compra ainda não está disponível online. Fale conosco e ajustamos tudo para você.">
        {/* <Button
          variant={isPrimary ? "tertiary" : "neutral"}
          href={`/compra/${tripId}/`}
          iconName="lock"
          disabled
          style={{ width: "100%" }}
        >
          Comprar por {formatToCurrencyBR(total)}
        </Button> */}
        <ItemButton
          iconName="dollar"
          title="Compra Manual"
          subtitle="Disponibilizamos para a você a possibiliade de realizar a sua comprar com um de nossos especialistas. Clique aqui e te daremos todo suporte necessário para a compra de sua viagem"
        />
      </HoverTooltipCard>
    );

  if (isScriptBuilt) return <BuyButton isPrimary />;

  return (
    <Grid>
      {isScriptAvailable ? (
        <Button variant={"tertiary" as any} href={`/app/viagens/${tripId}/roteiro/configurar/`}>
          Construir meu roteiro
        </Button>
      ) : (
        <HoverTooltipCard text="A construção do roteiro ainda não está disponível online.">
          <Button
            variant={"naked"}
            href={`/app/viagens/${tripId}/roteiro/configurar/`}
            iconName="lock"
            disabled
          >
            Construir meu roteiro
          </Button>
        </HoverTooltipCard>
      )}
      <BuyButton isPrimary={!isScriptAvailable} isPurchaseAvailable={isPurchaseAvailable} />
      <Text size="sm" className="px-md">
        <strong>Não se preocupe:</strong> comprando agora, você poderá construir o roteiro em um
        momento posterior
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
