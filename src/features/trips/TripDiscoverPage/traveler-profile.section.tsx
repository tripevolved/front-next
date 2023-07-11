import useSwr from "swr";

import type { TravelerProfileSectionProps } from "@/features";
import { CMSService } from "@/services/cms/cms-service";
import React from "react";

import { Picture, SectionBase, EmptyState, GlobalLoader, Box, DashedDivider } from "@/ui";
import { AppRibo } from "@/core/app-ribo";
import { Button } from "mars-ds";

const swrOptions = { revalidateOnFocus: false };

export function ProfileSection({ onSubmit, travelerProfile, className, children, ...props }: TravelerProfileSectionProps) {
  const getProfileProps = async () => {
    try {
      const uid = "perfil/" + travelerProfile;
      const profileProps = await CMSService.getSection(uid);
      return profileProps;
    } catch (error) {
      const profileProps = await CMSService.getSectionError();
      return profileProps;
    }
  }

  const { data, error, isLoading } = useSwr("profile", getProfileProps, swrOptions);
  
  if (error) return <EmptyState/>;
  if (isLoading) return <GlobalLoader/>;

  return (
    <SectionBase className="trip-discover" container={"xs" as any} {...props}>
      <Picture
        className="trip-discover__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <AppRibo>{data.children[0]}</AppRibo>
      <AppRibo>{data.children[1]}</AppRibo>
      <Box className="trip-discover__box">
        <AppRibo>{data.children[2]}</AppRibo>
        <DashedDivider/>
        <Button onClick={onSubmit}>Descobrir destinos</Button>
      </Box>
    </SectionBase>
  );
}