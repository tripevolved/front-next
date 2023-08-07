import type { ProfileQuestionsProps } from "./profile-questions.types";
import type { AnswersDto } from "@/services/api/profile/answers";

import { ProfileApiService } from "@/services/api/profile";

import { useRef, useState } from "react";
import { Card, Notification } from "mars-ds";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { ProfileQuestionsForm } from "./profile-questions-form";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import { LeadForm } from "@/features";
import { useAppStore } from "@/core/store";
import { Text } from "@/ui";

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

export function ProfileQuestions({ className, children, ...props }: ProfileQuestionsProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { lead, leadUpdate } = useAppStore();

  const router = useRouter();

  const answers = useRef<AnswersDto>({});
  const profileSlug = useRef<string>();

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) answers.current = newAnswers;
    if (!lead.email) setShowLeadForm(true);
    else sendAnswers(lead.email);
  };

  const sendAnswers = async (email: string) => {
    if (!email) {
      return Notification.error("Você precisa estar na Lista de espera para continuar");
    }
    try {
      setSubmitting(true);
      profileSlug.current = undefined;
      const data = { answers: answers.current, email };
      const result = await ProfileApiService.sendAnswers(data);
      profileSlug.current = result.profileSlug;
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  const handleFinish = async (attempts = 3) => {
    if (attempts < 1) profileSlug.current = "relax";
    if (!profileSlug.current) {
      await delay(2000);
      handleFinish(attempts - 1);
    } else {
      await router.replace(`/perfil/${profileSlug.current}`);
      leadUpdate({ profile: { slug: profileSlug.current } });
    }
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
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
        ) : showLeadForm ? (
          <Card className="color-brand-2">
            <div className="text-center">
              <Text className="lead-list-form__label py-xl" size="sm">
                Estamos quase lá!
              </Text>
              <Text as="h3" className="lead-list-form__heading pb-xl" variant="heading">
                Prencha para ver o resultado e receber uma boa surpresa no e-mail.
              </Text>
            </div>
            <LeadForm
              gap={16}
              onSubmitCallback={({ email }) => sendAnswers(email)}
              cta={{ children: "Descobrir meu perfil" }}
            />
          </Card>
        ) : (
          <ProfileQuestionsForm onSubmit={handleAnswers} />
        )}
      </Card>
    </SectionBase>
  );
}
