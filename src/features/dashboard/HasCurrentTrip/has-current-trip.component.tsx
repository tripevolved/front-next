import type { AllTrips as AllTripsProps, TripListView } from "@/core/types";

import { TripsApiService } from "@/services/api";

import { parsePhoto } from "@/utils/helpers/photo.helpers";

import { Grid, Icon, Label, LabelVariants, Skeleton, Tabs, ToggleButton } from "mars-ds";
import { CardTrip, EmptyState, ErrorState, Text, CardTripNew, confirmModal } from "@/ui";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";
import { useAllTrips } from "./has-current-trip.hook";

export function HasCurrentTrip() {
  return (
    <section className="has-current-trip">
      <Tabs
        tabs={[
          { label: "Próximas viagens", children: <MountTripTab tabType={"CURRENT"} /> },
          { label: "Viagens passadas", children: <MountTripTab tabType={"PAST"} /> },
        ]}
      />
    </section>
  );
}

function MountTripTab({ tabType }: { tabType: "CURRENT" | "PAST" }) {
  const pastTrips = tabType === "PAST" ? true : false;
  const { isLoading, error, data } = useAllTrips(pastTrips);

  const hasTrip = data && (data.currentTrip || data.otherTrips?.length > 0);

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeleton />;

  if (!hasTrip) return <EmptyState />;

  return <AllTrips {...data} disableDeletion={pastTrips} />;
}

function AllTrips({ currentTrip, otherTrips, disableDeletion = false }: AllTripsProps & { disableDeletion: boolean }) {
  return (
    <Grid className="all-trips py-md">
      {currentTrip ? (
        <div className="all-trips__main">
          <TripItem {...currentTrip} />
        </div>
      ) : null}
      <Grid columns={{ sm: 2, md: 3 }} className="all-trips__others">
        <CardTripNew title="Nova viagem" iconName="Plane" href="/app/viagens/descobrir" />
        {otherTrips.map((trip) => (
          <TripItem key={trip.id} {...trip} enableDeletion={!disableDeletion && (trip.status !== "Só falta viajar!" && trip.status !== "Pena que já passou :(")} />
        ))}
      </Grid>
    </Grid>
  );
}

const CONFIRM_REMOVE_TEXT =
  "Ao clicar em confirmar, sua viagem será removida. Essa ação não pode ser desfeita.";

function TripItem({
  id,
  title = "Sem nome",
  status,
  images,
  period,
  enableDeletion,
}: TripListView) {
  const [photo] = images;
  const image = photo ? parsePhoto(photo) : undefined;

  const { mutate } = useAllTrips(false);

  const handleRemove = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    await confirmModal(CONFIRM_REMOVE_TEXT, async () => {
      await TripsApiService.removeById(id);
      mutate();
    });
  };

  const Header = () => (
    <div className="trip-item__header">
      <Label variant={LabelVariants.Warning}>{status}</Label>
      {enableDeletion ? (
        <ToggleButton
          iconName="trash-2"
          variant="text"
          size="sm"
          title="Remover essa viagem"
          className="trip-item__deletion"
          onClick={handleRemove}
        />
      ) : null}
    </div>
  );

  return (
    <CardTrip
      image={image}
      title={title}
      header={<Header />}
      href={`/app/viagens/${id}`}
      className="trip-item"
    >
      {typeof period === "string" ? (
        <div className="trip-item__period">
          <Icon name="calendar" size="sm" />
          <Text>{normalizeDateString(period)}</Text>
        </div>
      ) : null}
    </CardTrip>
  );
}

export const LoadingSkeleton = () => (
  <Grid className="py-md" columns={{ sm: 2, md: 3 }}>
    {[1, 2, 3].map((key) => (
      <Skeleton key={key} active height={270} />
    ))}
  </Grid>
);
