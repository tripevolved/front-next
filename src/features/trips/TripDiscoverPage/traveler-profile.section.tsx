import useSwr from "swr";

import type { TravelerProfileSectionProps } from "@/features";
import type { AnswersDto } from "@/services/api/profile/answers";
import { CMSService } from "@/services/cms/cms-service";

import { ProfileApiService } from "@/services/api/profile";

import React, { useEffect, useRef, useState } from "react";
import { Card, Container, Notification } from "mars-ds";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { ProfileQuestionsForm } from "@/features/profile/ProfileQuestions/profile-questions-form";
import { delay } from "@/utils/helpers/delay.helpers";
import { useAfterLoginState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";
import { GetServerSideProps } from "next";
import { PopulateService } from "@/services/cms/populate.service";
import { AppRibo } from "@/core/app-ribo";

const swrOptions = { revalidateOnFocus: false };
const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Montando o seu perfil...",
    iconName: "settings",
  },
  {
    text: "Achamos 3 lugares para você curtir",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export function ProfileSection({ travelerProfile, className, children, ...props }: TravelerProfileSectionProps) {
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

  console.log(data);

  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <AppRibo>{data.children[0]}</AppRibo>
      <AppRibo>{data.children[1]}</AppRibo>
      <AppRibo>{data.children[2]}</AppRibo>
    </SectionBase>
  );
}