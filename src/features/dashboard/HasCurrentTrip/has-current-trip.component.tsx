import type { AllTrips as AllTripsProps, TripListView } from "@/core/types";

import useSWR from "swr";

import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/services/api";

import { parsePhoto } from "@/utils/helpers/photo.helpers";

import { Grid, Icon, Label, LabelVariants, Skeleton, Tabs } from "mars-ds";
import { CardTrip, EmptyState, ErrorState, Text, CardTripNew } from "@/ui";
import { normalizeDateString } from "@/utils/helpers/dates.helpers";

export function HasCurrentTrip() {
  return (
    <section className="has-current-trip">
      <Tabs
        tabs={[
          { label: "Próximas viagens", children: <CurrentTrips /> },
          {
            label: "Viagens passadas",
            children: <EmptyState text="Você ainda não possui viagens realizadas" />,
          },
        ]}
      />
    </section>
  );
}

function CurrentTrips() {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const { isLoading, error, data } = useSWR(travelerId, () => TripsApiService.getAll(travelerId));

  const hasTrip = data && (data.currentTrip || data.otherTrips?.length > 0);

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeleton />;

  if (!hasTrip) return <EmptyState />;

  return <AllTrips {...data} />;
}

function AllTrips({ currentTrip, otherTrips }: AllTripsProps) {
  return (
    <Grid className="all-trips py-md">
      {currentTrip ? (
        <div className="all-trips__main">
          <TripItem {...currentTrip} />
        </div>
      ) : null}
      <Grid columns={{ sm: 2, md: 3 }} className="all-trips__others">
        <CardTripNew
          title="Descobrir mais uma viagem"
          iconName="Plane"
          href="/app/viagens/descobrir"
        />
        {otherTrips.map((trip) => (
          <TripItem key={trip.id} {...trip} />
        ))}
      </Grid>
    </Grid>
  );
}

function TripItem({ id, title = "Sem nome", status, images, period }: TripListView) {
  const [photo] = images;
  const image = photo ? parsePhoto(photo) : undefined;

  return (
    <CardTrip
      image={image}
      title={title}
      header={<Label variant={LabelVariants.Warning}>{status}</Label>}
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
