import type { DestinationsByProfileNameProps } from "./destinations-by-profile-name.types";

import useSWR from "swr";
import { Button, Skeleton } from "mars-ds";
import { EmptyState, CardTrip, AutoScrollCards, CardTripNew } from "@/ui";
import { ProfileApiService } from "@/services/api";

export function DestinationsByProfileName({
  profileName,
  enableNewTrip = false,
}: DestinationsByProfileNameProps) {
  const keyName = `destinations-by-${profileName}`;
  const fetcher = async () => ProfileApiService.getDestinations(profileName);
  const swrOptions = { revalidateOnFocus: false };

  const { data: destinations = [], error, isLoading } = useSWR(keyName, fetcher, swrOptions);

  if (error) {
    return enableNewTrip ? (
      <AutoScrollCards>
        <NewTrip />
      </AutoScrollCards>
    ) : (
      <ProfileErrorState />
    );
  }

  if (isLoading) return <ProfileLoadingState />;

  return (
    <AutoScrollCards>
      {enableNewTrip && <NewTrip />}
      {destinations.map(({ id, name, coverImageUrl, href }) => (
        <CardTrip key={id} title={name} image={coverImageUrl || undefined} href={href}>
          <Button
            className="theme-dark"
            href={href}
            size="sm"
            variant="neutral"
            iconName="arrow-right"
            isRtl
          >
            Ver mais
          </Button>
        </CardTrip>
      ))}
    </AutoScrollCards>
  );
}

const NewTrip = () => (
  <CardTripNew title="Nova viagem" iconName="Plane" href="/app/viagens/descobrir" />
);

const ProfileLoadingState = () => (
  <AutoScrollCards>
    {[1, 2, 3].map((key) => (
      <DestinationItemSkeleton key={key} />
    ))}
  </AutoScrollCards>
);

const ProfileErrorState = () => (
  <EmptyState text="Não foram encontrados destinos para esse perfil devido a um erro :(" />
);

const DestinationItemSkeleton = () => (
  <div className="destination-item">
    <Skeleton className="destination-item__card--skeleton" height={272} active />
  </div>
);
