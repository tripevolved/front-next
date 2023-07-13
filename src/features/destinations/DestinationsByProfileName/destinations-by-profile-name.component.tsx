import { AutoScroll, Button, Card, Link, Skeleton } from "mars-ds";
import type { DestinationsByProfileNameProps } from "./destinations-by-profile-name.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { ProfileApiService } from "@/services/api";
import { EmptyState, BoxProps, Box, Text } from "@/ui";
import { useCallback, useMemo } from "react";
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
      <>
        {destinations.map(({ id, name, coverImageUrl, href }) => (
          <DestinationItem
            key={id}
            heading={name}
            image={coverImageUrl}
            href={href}
          />
        ))}
      </>
    ),
    [destinations, profileName]
  );

  return (
    <AutoScroll className="destinations-by-profile-name">
      {error ? (
        <ProfileErrorState />
      ) : isLoading ? (
        <ProfileLoadingState />
      ) : destinations.length == 0 ? (
        <ProfileEmptyState />
      ) : (
        <ProfileDestinations />
      )}
    </AutoScroll>
  );
};

const ProfileLoadingState = () => (
  <>
    {[1, 2, 3].map((key) => (
      <DestinationItemSkeleton key={key} />
    ))}
  </>
);

const ProfileErrorState = () => (
  <EmptyState text="Não foram encontrados destinos para esse perfil, devido à um erro :(" />
);

const ProfileEmptyState = () => (
  <EmptyState text="Não foram encontrados destinos para esse perfil :(" />
);

interface DestinationItemProps extends BoxProps {
  heading?: string;
  image: string | null;
  href: string;
}

const DestinationItem = ({
  className,
  heading,
  href,
  image,
  sx,
  ...props
}: DestinationItemProps) => {
  const backgroundImage = useMemo(() => (image ? `url(${image})` : undefined), [image]);

  const cn = makeCn("destination-item__card", className)(sx, {
    "--cover-image": backgroundImage,
  });

  return (
    <Link href={href} className="destination-item">
      <Box as={Card} className={cn} {...props}>
        <Text as="h3" heading size="xs">
          <strong>{heading}</strong>
        </Text>
        <div>
          <Button href={href} size="sm">
            Descobrir destino
          </Button>
        </div>
      </Box>
    </Link>
  );
};

const DestinationItemSkeleton = () => (
  <div className="destination-item">
    <Skeleton className="destination-item__card--skeleton" active />
  </div>
);
