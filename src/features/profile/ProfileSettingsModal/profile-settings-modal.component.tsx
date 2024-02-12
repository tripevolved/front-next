import { AnswersDto } from "@/services/api/profile/answers";
import { useProfileSettings } from "./profile-settings-modal.hook";
import type { ProfileSettingsModalProps } from "./profile-settings-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { EmptyState, Picture, StepsLoader } from "@/ui";
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
  const { answers, setCanSubmit, isLoading, error, data } = useProfileSettings();

  const handleAnswers = (newAnswers?: AnswersDto) => {
    if (newAnswers) answers.current = newAnswers;
    setCanSubmit(true);
  };

  if (isLoading) return <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} />;
  if (error) return <EmptyState />;

  if (data?.profileSlug && onClose) onClose();

  return (
    <div className="profile-settings-modal" {...props}>
      <Picture
        className="profile-settings-modal__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <ProfileQuestionsForm onSubmit={handleAnswers} />
    </div>
  );
}
