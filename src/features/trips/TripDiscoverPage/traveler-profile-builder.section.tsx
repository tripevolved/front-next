import type { TravelerProfileBuilderSectionProps } from "@/features";
import type { AnswersDto } from "@/services/api/profile/answers";

import { ProfileApiService } from "@/services/api/profile";

import { useRef, useState } from "react";
import { Card, Notification } from "mars-ds";

import { Picture, SectionBase, StepsLoader } from "@/ui";
import { ProfileQuestionsForm } from "@/features/profile/ProfileQuestions/profile-questions-form";
import { delay } from "@/utils/helpers/delay.helpers";
import { useAfterLoginState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";

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

export function ProfileBuilderSection({ travelerId, className, children, ...props }: TravelerProfileBuilderSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const { travelerStateGet } = useAfterLoginState();

  const answers = useRef<AnswersDto>({});
  const profileSlug = useRef<string>();

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) answers.current = newAnswers;
    
    sendAnswers();
  };

  const sendAnswers = async () => {
    try {
      setSubmitting(true);
      const data = { answers: answers.current, travelerId };
      const result = await ProfileApiService.sendAnswersByTravelerId(data);
      profileSlug.current = result.profileSlug;
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  const handleFinish = async (attempts = 3) => {
    if (attempts < 1) profileSlug.current = "relax";
    if (!profileSlug.current) {
      await delay(1000);
      handleFinish(attempts - 1);
    } else {
      travelerStateGet();
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
        ) : (
          <ProfileQuestionsForm onSubmit={handleAnswers} />
        )}
      </Card>
    </SectionBase>
  );
}
