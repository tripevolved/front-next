import { useAppStore } from "@/core/store";
import { ProfileApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { useRef, useState } from "react";
import useSWR from "swr";

export const useProfileSettings = (onClose: VoidFunction) => {
  const { email } = useAppStore((state) => state.user);
  const [canSubmit, setCanSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const answers = useRef<AnswersDto>({});

  const fetcher = async () =>
    ProfileApiService.sendAnswers({ answers: answers.current, email }).then(() => setSuccess(true));
  const { isLoading, error, data, isValidating } = useSWR(
    canSubmit ? `send-answers-to-set-traveler-profile-${email}` : null,
    fetcher
  );

  return {
    answers,
    setCanSubmit,
    isLoading,
    isValidating,
    error,
    data,
    success,
  };
};
