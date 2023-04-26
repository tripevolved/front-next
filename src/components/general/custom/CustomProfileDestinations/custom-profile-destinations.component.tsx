import useSWR from "swr";
import {
  Box,
  BoxProps,
  EmptyState,
  MediaObject,
  Text,
  WhatsappButton,
} from "@/components";
import type { CustomProfileDestinationsProps } from "./custom-profile-destinations.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { ProfileApiService } from "@/services/api/profile";
import { AutoScroll, Card, Grid, Skeleton } from "mars-ds";

export function CustomProfileDestinations({
  className,
  children,
  profileName: name,
  sx,
  ...props
}: CustomProfileDestinationsProps) {
  const cn = makeClassName("custom-profile-destinations", className)(sx);

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
        {destinations.map(({ id, name, coverImageUrl }) => (
          <DestinationItem
            key={id}
            heading={name}
            image={coverImageUrl}
            profileName={profileName}
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
}

const DestinationItem = ({
  className,
  heading,
  image,
  profileName,
  sx,
  ...props
}: DestinationItemProps) => {
  const backgroundImage = useMemo(() => (image ? `url(${image})` : undefined), [image]);

  const cn = makeClassName("destination-item__card", className)(sx, {
    "--cover-image": backgroundImage,
  });

  const message = useMemo(() => {
    return `Olá, eu já sei para onde quero ir: ${heading}! O meu perfil viajante é: ${profileName}`;
  }, [heading, profileName]);

  return (
    <div className="destination-item">
      <Box as={Card} className={cn} {...props}>
        <Text as="h3" heading size="xs">
          <strong>{heading}</strong>
        </Text>
        <div>
          <WhatsappButton message={message} hideIcon size="sm">
            Quero ir
          </WhatsappButton>
        </div>
      </Box>
    </div>
  );
};

const DestinationItemSkeleton = () => (
  <div className="destination-item">
    <Skeleton className="destination-item__card--skeleton" active />
  </div>
);
