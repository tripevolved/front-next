import { AnswersDto } from "@/services/api/profile/answers";
import { useProfileSettings } from "./profile-settings-modal.hook";
import type { ProfileSettingsModalProps } from "./profile-settings-modal.types";

import { ErrorState, Picture, StepsLoader, Text } from "@/ui";
import { ProfileQuestionsForm } from "../ProfileQuestions/profile-questions-form";
import { Grid, Button } from "mars-ds";

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Enviando o seu perfil...",
    iconName: "settings",
  },
  {
    text: "Encontrando lugares e eventos de seu interesse...",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export function ProfileSettingsModal({
  className,
  children,
  sx,
  onClose,
  isModalView = false,
  ...props
}: ProfileSettingsModalProps) {
  const { answers, setCanSubmit, isLoading, error, data, isValidating } =
    useProfileSettings(onClose);

  const handleAnswers = (newAnswers: AnswersDto) => {
    answers.current = newAnswers;
    setCanSubmit(true);
  };
  if (error) return <ErrorState />;

  return (
    <div className="profile-settings-modal" {...props}>
      {isModalView ? (
        <Picture
          className="profile-settings-modal__brand"
          height={60}
          width={60}
          src="/brand/logo-symbol.svg"
        />
      ) : null}
      {isLoading || isValidating ? (
        <div
          className="flex w-100"
          style={{ height: "100vh", alignContent: "center", justifyContent: "center" }}
        >
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} />
        </div>
      ) : (
        <ProfileQuestionsForm onSubmit={handleAnswers} isModalView={isModalView} />
      )}
    </div>
  );
}
