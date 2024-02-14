import { AnswersDto } from "@/services/api/profile/answers";
import { useProfileSettings } from "./profile-settings-modal.hook";
import type { ProfileSettingsModalProps } from "./profile-settings-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { EmptyState, ErrorState, Picture, StepsLoader } from "@/ui";
import { ProfileQuestionsForm } from "../ProfileQuestions/profile-questions-form";

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
      <Picture
        className="profile-settings-modal__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      {isLoading || isValidating ? (
        <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} />
      ) : (
        <ProfileQuestionsForm onSubmit={handleAnswers} />
      )}
    </div>
  );
}
