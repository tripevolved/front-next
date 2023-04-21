import useSWR from "swr";
import { Box, BoxProps, MediaObject, Picture, Text, WhatsappButton } from "@/components";
import type { CustomProfileDestinationsProps } from "./custom-profile-destinations.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { ProfileApi } from "@/services/api/profile-api.service";
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
        <Text heading size="xs" sx={{ textAlign: "left" }}>
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
  } = useSWR(profileName, () => ProfileApi.getDestinations(profileName), {
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
      <div className="auto-scroll-gap" />
      {error ? (
        <ProfileErrorState />
      ) : isLoading ? (
        <ProfileLoadingState />
      ) : destinations.length == 0 ? (
        <ProfileEmptyState />
      ) : (
        <ProfileDestinations />
      )}
      <div className="auto-scroll-gap" />
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
  <div className="destinations-block__empty-state">
    <Picture src="/assets/states/empty-state.svg" />
    <Text>Não foram encontrados destinos para esse perfil, devido à um erro :(</Text>
  </div>
);

const ProfileEmptyState = () => (
  <div className="destinations-block__empty-state">
    <Picture src="/assets/states/empty-state.svg" />
    <Text>Não foram encontrados destinos para esse perfil :(</Text>
  </div>
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
