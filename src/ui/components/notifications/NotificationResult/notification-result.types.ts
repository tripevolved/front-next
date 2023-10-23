import type { ComponentHTMLProps } from "@/core/types";

export interface NotificationResultProps extends ComponentHTMLProps {
  isSuccess: boolean;
  message?: string;

  successTitle?: string;
  successMessage?: string;
  successOnClick?: () => void;
  redirectTo?: string;
  redirectToTitle?: string;

  nonSuccessTitle?: string;
  nonSuccessSubtitle?:string;
  nonSuccessAllowSkip?: boolean;
  nonSuccessAllowRetry?: boolean;
  nonSuccessSkipOnClick?: () => void;
}
