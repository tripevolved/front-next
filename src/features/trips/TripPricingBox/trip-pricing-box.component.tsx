import useSWR from "swr";
import { HoverTooltipCard, Picture, Text, WhatsappButton } from "@/ui";
import {
  Button,
  Card,
  CardElevations,
  Divider,
  Grid,
  Icon,
  ItemElement,
  Skeleton,
  SkeletonVariants,
} from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import ToggleButton from "@/ui/components/buttons/ToggleButton/toggle-button.component";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { SimpleItineraryAction } from "@/core/types";

interface MessageProps {
  tripName: string;
  budget: number;
  itinerary?: SimpleItineraryAction[];
  username: string;
  email: string;
  formattedDates: string;
  travelersNumber: number | string;
}

interface TripPricingBoxProps {
  destinationName: string;
  numAdults: number;
  numChildren?: number;
  isScriptBuilt?: boolean;
  hasPhotos?: boolean;
  messageProps: MessageProps;
}

export const TripPricingBox = ({
  destinationName,
  numAdults = 2,
  numChildren = 0,
  isScriptBuilt,
  hasPhotos,
  messageProps,
}: TripPricingBoxProps) => {
  const { availableFeatures } = useAppStore((state) => state.travelerState);
  const simpleItinerary = useAppStore((state) => state.simpleItinerary);
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
    ? `Para ${numAdults > 1 ? `${numAdults} adultos` : `${numAdults} adulto`} e ${
        numChildren > 1 ? `${numChildren} crianças` : `${numChildren} criança`
      }`
    : `Para ${numAdults > 1 ? `${numAdults} adultos` : `${numAdults} adulto`}`;

  return (
    <div className={makeCn("trip-pricing-box", { "trip-pricing-box--offset": hasPhotos })()}>
      <div className="trip-pricing-box-spacer" />
      {/* <TripPricingBoxToggle
        title={destinationName}
        total={data.amountWithDiscount ?? data.amount}
        isPurchaseAvailable={allowPurchase}
      /> */}
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
          messageProps={{ ...messageProps, itinerary: simpleItinerary.actions }}
        />
      </Card>
    </div>
  );
};

// const TripPricingBoxToggle = ({
//   title,
//   total,
//   isPurchaseAvailable,
// }: Pick<TripPricingBoxContentProps, "title" | "total" | "isPurchaseAvailable">) => {
//   return (
//   <Card
//     as="button"
//     elevation={CardElevations.Medium}
//     className="trip-pricing-box-toggle theme-dark"
//     onClick={() => {
//       document.body.dataset.pricingBox = "opened";
//     }}
//   >
//     <Grid>
//       <Grid columns={["1fr", "auto", "24px"]} className="align-items-start">
//         <Text heading as="h2" size="xs">
//           {title}
//         </Text>
//         <Text as="strong" heading size="xs">
//           {formatToCurrencyBR(total)}
//         </Text>
//         <Icon className="trip-pricing-box-toggle__icon" name="chevron-up" />
//       </Grid>
//       {isPurchaseAvailable ? (
//         <Button>Comprar viagem</Button>
//       ) : (
//         <HoverTooltipCard text="A compra ainda não está disponível online. Fale conosco e ajustamos tudo para você.">
//           <Button iconName="lock" disabled style={{ width: "100%" }}>
//             Comprar viagem
//           </Button>
//         </HoverTooltipCard>
//       )}
//     </Grid>
//   </Card>
// )};

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
  messageProps: MessageProps;
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
  messageProps,
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
    <Grid gap={8}>
      <Text heading as="h3" size="xs">
        <strong>
          <small
            style={{
              color: "rgba(26, 54, 93, 1)",
              fontFamily: '"Comfortaa", sans-serif',
              fontSize: 14,
            }}
          >
            O que inclui
          </small>
        </strong>
      </Text>
      <Grid gap={8} className="px-md" style={{ padding: "20px 0" }}>
        {tripIncludes.map((item, key) => (
          <TripPricingBoxContentItem
            key={key}
            image={`/assets/destino/${item.slug}.svg`}
            text={item.title}
          />
        ))}
      </Grid>
      <Divider />
      <Grid className="px-md" gap={8}>
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
        messageProps={messageProps}
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
    <Text heading as="h2">
      {title}
    </Text>
    <Grid
      columns={["auto", "1fr"]}
      className="mb-md"
      style={{ color: "rgba(26, 54, 93, 1)", fontFamily: '"Comfortaa", sans-serif' }}
    >
      <Text style={{ color: "rgba(140, 142, 146, 1)", fontSize: 14, padding: "10px 0" }}>
        {people}
      </Text>
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
  messageProps,
}: Pick<
  TripPricingBoxContentProps,
  "tripId" | "total" | "isPaid" | "isScriptBuilt" | "isScriptAvailable" | "isPurchaseAvailable"
> & { messageProps: MessageProps }) => {
  const message = `
  Olá, eu sou ${messageProps.username}. Segue os dados da minha viagem para ${messageProps.tripName}

  *Dados da Viagem:*
    - Posso gastar até ${formatToCurrencyBR(messageProps.budget)};
    - Itinerário:${messageProps.itinerary!.map(
      (item) => `
        - ${item.title}`
    )};
    - Número de viajantes: ${messageProps.travelersNumber}
    - Datas da viagem: ${messageProps.formattedDates}
  `;

  const handleClick = () => {
    document.getElementById("whatsapp-purchase-button")?.click();
  };

  if (isPaid) return <Button disabled>A viagem já está paga.</Button>;

  const BuyButton = ({ isPrimary = false, isPurchaseAvailable = true }) =>
    isPurchaseAvailable ? (
      <div style={{ paddingTop: 20, display: "flex", flexDirection: "column" }}>
        <Button variant="tertiary" href={`/compra/${tripId}/`}>
          Comprar por {formatToCurrencyBR(total)}
        </Button>
        <WhatsappButton
          message={`Quero conversar sobre minha viagem para ${messageProps.tripName}.`}
          variant="secondary"
          style={{ border: "none", color: "#1A365D", fontSize: 14 }}
        >
          Quero alterar a viagem
        </WhatsappButton>
      </div>
    ) : (
      <ItemElement
        id="whatsapp-purchase-area"
        className="flex-column gap-md"
        style={{ cursor: "pointer", padding: 15 }}
        onClick={() => handleClick()}
      >
        <Text size="lg" style={{ color: "var(--color-gray-1)" }}>
          Disponibilizamos para você a possibilidade de{" "}
          <span className="color-primary">
            <strong>realizar a sua compra</strong> e <strong>construir seu roteiro</strong> com um
            dos nossos especialistas
          </span>
          . <strong>Clique aqui</strong> e terá todo o suporte necessário em todas as etapas da sua
          viagem.
        </Text>
        <Button
          id="whatsapp-purchase-button"
          iconName="whatsapp"
          label="Realizar Compra"
          size="sm"
          target="_blank"
          href={getWhatsappLink(message)}
        />
      </ItemElement>
    );

  if (isScriptBuilt) return <BuyButton isPrimary />;

  return (
    <Grid>
      <BuyButton isPrimary={!isScriptAvailable} isPurchaseAvailable={isPurchaseAvailable} />
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
      <WhatsappButton message={`Quero conversar sobre minha viagem para ${title}.`}>
        Quero alterar a viagem
      </WhatsappButton>
    </Grid>
  </Card>
);
