import useSwr from "swr";

import type { TravelerProfileSectionProps } from "@/features";
import { CMSService } from "@/services/cms/cms-service";
import React from "react";
import { PROFILE_NAMES } from "@/features";

import { EmptyState, GlobalLoader, Picture, SectionBase, Text, MediaObject, Box, DashedDivider } from "@/ui";
import { Button } from "mars-ds";

// import { Picture, SectionBase, EmptyState, GlobalLoader, Box, DashedDivider } from "@/ui";
// import { AppRibo } from "@/core/app-ribo";

const swrOptions = { revalidateOnFocus: false };

export function ProfileSection({
  onSubmit,
  travelerProfile,
  className,
  children,
  ...props
}: TravelerProfileSectionProps) {
  // const getProfileProps = async () => CMSService.getSection(`perfil/${travelerProfile}`);

  // const { data, error, isLoading } = useSwr("profile", getProfileProps, swrOptions);

  const travelerProfileText = "";

  // if (error) return <EmptyState />;
  // if (isLoading) return <GlobalLoader />;

  return (
    <SectionBase className="trip-discover" container={"xs" as any} {...props}>
      <Picture
        className="trip-discover__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Box className="trip-discover__box">
        <Box className="trip-discover__traveler-profile">
          <Text heading={true} className="trip-discover__title mb-lg">Seu perfil de viajante é...</Text>
          <MediaObject
            image={`/assets/perfil/${travelerProfile}.svg`}
            heading={{
              size: 'sm',
              as:"h3",
              children: PROFILE_NAMES[travelerProfile]
            }}
          />
        </Box>
        <Button 
          onClick={onSubmit}
          className="mt-xl"
          backgroundColor="var(--color-brand-2)"
          hoverBackgroundColor="var(--color-secondary-900)"
          color="white"
          variant="custom">Descobrir destinos</Button>
      </Box>
    </SectionBase>
  );

  // TODO: fix this implementation

  // return (
  //   <SectionBase className="trip-discover" container={"xs" as any} {...props}>
  //     <Picture
  //       className="trip-discover__brand"
  //       height={60}
  //       width={60}
  //       src="/brand/logo-symbol.svg"
  //     />
  //     <AppRibo>{data.children[0]}</AppRibo>
  //     <AppRibo>{data.children[1]}</AppRibo>
  //     <Box className="trip-discover__box">
  //       <AppRibo>{data.children[2]}</AppRibo>
  //       <DashedDivider />
  //       <Button onClick={onSubmit}>Descobrir destinos</Button>
  //     </Box>
  //   </SectionBase>
  // );
}
