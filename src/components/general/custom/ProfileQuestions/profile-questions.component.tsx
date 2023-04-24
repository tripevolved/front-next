import type { ProfileQuestionsProps } from "./profile-questions.types";
import type { AnswersDto } from "@/services/api/profile/questions";

import { ProfileApiService } from "@/services/api/profile";

import { useState } from "react";
import { Card } from "mars-ds";

import { LeadForm, MediaObject, Picture, SectionBase, StepsLoader, Text } from "@/components";
import { ProfileQuestionsForm } from "./profile-questions-form";
import { LeadApiService } from "@/services/api/lead";
import { useRouter } from "next/router";

const SEVEN_SECONDS_IN_MS = 7 * 1000;
const STEPS = [
  "Montando o seu perfil...",
  "Achamos 7 lugares para você curtir",
  "Estamos selecionando as melhores opções",
];

export function ProfileQuestions({ className, children, ...props }: ProfileQuestionsProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [answers, setAnswers] = useState<AnswersDto>({});
  const [submitting, setSubmitting] = useState(false);
  const [profileSlug, setProfileSlug] = useState("relax");

  const router = useRouter();

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) setAnswers(newAnswers);
    const lead = LeadApiService.getLocal();

    if (!lead?.email) setShowLeadForm(true);
    else sendAnswers();
  };

  const sendAnswers = async () => {
    setSubmitting(true);
    // TODO: add guest lead id by email;
    const leadId = "";
    ProfileApiService.sendAnswers({ answers, leadId })
      .then((data) => setProfileSlug(data.profileSlug))
      .catch(() => {});
    setTimeout(toProfileResult, SEVEN_SECONDS_IN_MS);
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
      <Card>
        {submitting ? (
          <StepsLoader timeout={SEVEN_SECONDS_IN_MS} texts={STEPS} />
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
          <ProfileQuestionsForm onAnswers={handleAnswers} />
        )}
      </Card>
    </SectionBase>
  );
}
