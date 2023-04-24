import type { ProfileQuestionsProps } from "./profile-questions.types";
import type { AnswersDto } from "@/services/api/profile/questions";

import { ProfileApiService } from "@/services/api/profile";

import { useRef, useState } from "react";
import { Card, Notification } from "mars-ds";

import { LeadForm, MediaObject, Picture, SectionBase, StepsLoader } from "@/components";
import { ProfileQuestionsForm } from "./profile-questions-form";
import { LeadApiService } from "@/services/api/lead";
import { useRouter } from "next/router";

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Montando o seu perfil...",
    iconName: "settings",
  },
  {
    text: "Achamos 7 lugares para você curtir",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export function ProfileQuestions({ className, children, ...props }: ProfileQuestionsProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profileSlug, setProfileSlug] = useState("relax");

  const router = useRouter();

  const answers = useRef<AnswersDto>({});

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) answers.current = (newAnswers);
    const lead = LeadApiService.getLocal();

    if (!lead?.email) setShowLeadForm(true);
    else sendAnswers();
  };

  const sendAnswers = async () => {
    const lead = LeadApiService.getLocal();
    const email = lead?.email;
    if (!email) {
      return Notification.error("Você precisa estar na Lista de espera para continuar");
    }
    setSubmitting(true);
    return ProfileApiService.sendAnswers({ answers: answers.current, email })
      .then((data) => setProfileSlug(data.profileSlug))
      .catch(() => {});
  };

  const toProfileResult = () => {
    const path = `/perfil/${profileSlug}`;
    router.replace(path);
  };

  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        {submitting ? (
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={toProfileResult} />
        ) : showLeadForm ? (
          <MediaObject
            className="text-center"
            heading="Estamos quase lá!"
            text="Participe da lista e você pode ganhar uma viagem gratuita!"
          >
            <LeadForm
              gap={16}
              onSubmitCallback={() => handleAnswers()}
              cta={{ children: "Descobrir meu perfil" }}
            />
          </MediaObject>
        ) : (
          <ProfileQuestionsForm onSubmit={handleAnswers} />
        )}
      </Card>
    </SectionBase>
  );
}
