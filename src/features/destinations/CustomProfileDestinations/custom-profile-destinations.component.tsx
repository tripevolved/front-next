import useSWR from "swr";
import { Box, BoxProps, EmptyState, MediaObject, Text, WhatsappButton } from "@/ui";
import type { CustomProfileDestinationsProps } from "./custom-profile-destinations.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { AutoScroll, Button, Card, Grid, Link, Skeleton } from "mars-ds";
import { ProfileApiService } from "@/services/api/profile";

export function CustomProfileDestinations({
  className,
  children,
  profileName: name,
  sx,
  ...props
}: CustomProfileDestinationsProps) {
  const cn = makeCn("custom-profile-destinations", className)(sx);

  const { asPath } = useRouter();
  const profileName = useMemo(() => name || asPath.replace(/.*\/(.*)\/$/, "$1"), [asPath, name]);

  const message = useMemo(() => {
    return `Olá, eu já sei para onde quero ir! O meu perfil viajante é: ${profileName}`;
  }, [profileName]);

  return (
    <MediaObject className={cn} {...props}>
      <Grid className="mt-lg">
        <Text heading size="xs">
          Alguns destinos que você pode gostar:
        </Text>
        <DestinationBlock profileName={profileName} />
        <div>
          <WhatsappButton message={message} variant="secondary">
            Já sei para onde ir
          </WhatsappButton>
        </div>
      </Grid>
      {children}
    </MediaObject>
  );
}

interface DestinationsProps {
  profileName: string;
}

const DestinationBlock = ({ profileName }: DestinationsProps) => {
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
            profileName={profileName}
            href={href}
          />
        ))}
      </>
    ),
    [destinations, profileName]
  );

  return (
    <AutoScroll className="destinations-block">
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
  profileName: string;
  href: string;
}

const DestinationItem = ({
  className,
  heading,
  href,
  image,
  profileName,
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
            Quero ir
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
