import { useAppStore } from "@/core/store";
import { ProfileApiService } from "@/services/api";
import { AnswersDto } from "@/services/api/profile/answers";
import { useRef, useState } from "react";
import useSWR from "swr";

export const useProfileSettings = () => {
  const { email } = useAppStore((state) => state.user);
  const [canSubmit, setCanSubmit] = useState(false);
  const answers = useRef<AnswersDto>({});

  const fetcher = async () => ProfileApiService.sendAnswers({ answers: answers.current, email });
  const { isLoading, error, data } = useSWR(
    canSubmit ? `set-traveler-profile-${email}` : null,
    fetcher
  );

  return {
    answers,
    setCanSubmit,
    isLoading,
    error,
    data,
  };
};
