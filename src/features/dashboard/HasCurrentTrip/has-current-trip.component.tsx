import type { AllTrips as AllTripsProps, TripListView } from "@/core/types";

import useSWR from "swr";

import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/services/api";

import { parsePhoto } from "@/utils/helpers/photo.helpers";

import { Button, Grid, Icon, Link, Loader, Tabs } from "mars-ds";
import { CardTrip, EmptyState, ErrorState, Text } from "@/ui";

export function HasCurrentTrip() {
  return (
    <section className="has-current-trip">
      <Tabs
        tabs={[
          { label: "Suas viagens", children: <CurrentTrips /> },
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

  // TODO: add skeleton loader
  if (isLoading) return <Loader />;

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
      <Grid columns={{ md: 3 }} className="all-trips__others">
        {otherTrips.map((trip) => (
          <TripItem key={trip.id} {...trip} />
        ))}
      </Grid>
      <div className="text-center py-xl">
        <Button href="/app/viagens/descobrir" variant="secondary" iconName="plus">
          Descobrir mais uma viagem
        </Button>
      </div>
    </Grid>
  );
}

function TripItem({ id, title = "Sem nome", images, period }: TripListView) {
  const [photo] = images;
  const image = photo ? parsePhoto(photo) : undefined;

  return (
    <Link href={`/app/viagens/${id}`} className="trip-item">
      <CardTrip image={image} title={title}>
        {typeof period === "string" ? (
          <div className="trip-item__period">
            <Icon name="calendar" size="sm" />
            <Text>{period.replace(".", "").toUpperCase()}</Text>
          </div>
        ) : null}
      </CardTrip>
    </Link>
  );
}
