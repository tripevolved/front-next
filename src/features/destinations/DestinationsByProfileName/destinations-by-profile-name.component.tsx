import { Button, Skeleton } from "mars-ds";
import type { DestinationsByProfileNameProps } from "./destinations-by-profile-name.types";

import { ProfileApiService } from "@/services/api";
import { EmptyState, CardTrip, Box } from "@/ui";
import { useCallback } from "react";
import useSWR from "swr";

export function DestinationsByProfileName({ profileName }: DestinationsByProfileNameProps) {
  const {
    data: destinations = [],
    error,
    isLoading,
  } = useSWR(profileName, () => ProfileApiService.getDestinations(profileName), {
    revalidateOnFocus: false,
  });

  const ProfileDestinations = useCallback(
    () => (
      <div className="matched-destinations-cards">
        {destinations.map(({ id, name, coverImageUrl, href }) => (
          <div key={id}>
            <CardTrip title={name} image={coverImageUrl || undefined} href={href}>
              <Box className="theme-dark" sx={{ minWidth: 200 }}>
                <Button href={href} size="sm" variant="neutral" iconName="arrow-right" isRtl>
                  Descobrir destino
                </Button>
              </Box>
            </CardTrip>
          </div>
        ))}
      </div>
    ),
    [profileName, destinations]
  );

  return (
    <section className="destinations-by-profile-name">
      {error ? (
        <ProfileErrorState />
      ) : isLoading ? (
        <ProfileLoadingState />
      ) : destinations.length == 0 ? (
        <ProfileEmptyState />
      ) : (
        <ProfileDestinations />
      )}
    </section>
  );
}

const ProfileLoadingState = () => (
  <div className="matched-destinations-cards">
    {[1, 2, 3].map((key) => (
      <DestinationItemSkeleton key={key} />
    ))}
  </div>
);

const ProfileErrorState = () => (
  <EmptyState text="Não foram encontrados destinos para esse perfil, devido à um erro :(" />
);

const ProfileEmptyState = () => (
  <EmptyState text="Não foram encontrados destinos para esse perfil :(" />
);

const DestinationItemSkeleton = () => (
  <div className="destination-item">
    <Skeleton className="destination-item__card--skeleton" active />
  </div>
);
