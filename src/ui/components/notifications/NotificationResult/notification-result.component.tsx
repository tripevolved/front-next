import { Box, Text, Picture } from "@/ui";
import { Button } from "mars-ds";
import { NotificationResultProps } from "./notification-result.types";

export function NotificationResult({
  isSuccess,
  message,
  successTitle,
  successMessage,
  successOnClick,
  redirectTo,
  redirectToTitle,
  nonSuccessTitle,
  nonSuccessSubtitle,
  nonSuccessAllowRetry,
  nonSuccessAllowSkip,
  nonSuccessSkipOnClick
}: NotificationResultProps) {
  return (
    <Box className="notification-result">
      {!isSuccess ? (
        <>
          <Picture className="notification-result-item" src="/assets/notifications/error.png" />
          <Text className="notification-result-item" heading size="xl">{nonSuccessTitle}</Text>
          <Text className="notification-result-item" size="lg">{nonSuccessSubtitle}</Text>
          {message && <Text className="notification-result-item" size="sm">Mais informações: {message}</Text>}
          {nonSuccessAllowRetry && (<Button
            className="notification-result-button"
            variant="custom"
            backgroundColor="var(--color-brand-2)"
            hoverBackgroundColor="var(--color-secondary-900)"
            color="white">
            Tentar novamente
          </Button>)}
          {nonSuccessAllowSkip && (<Button
            className="notification-result-button"
            variant="secondary"
            onClick={nonSuccessSkipOnClick}>
            Deixar para depois
          </Button>)}
        </>
      ) : (
        <>
          <Picture className="notification-result-item" src="/assets/notifications/success.png" />
          <Text className="notification-result-item" heading size="xl">{successTitle}</Text>
          <Text className="notification-result-item" size="lg">{successMessage}</Text>
          <Button
            className="notification-result-button"
            variant="custom"
            backgroundColor="var(--color-brand-2)"
            hoverBackgroundColor="var(--color-secondary-900)"
            color="white"
            href={redirectTo}
            onClick={!redirectTo ? successOnClick : undefined}
          >
            {redirectToTitle}
          </Button>
        </>
      )}
    </Box>
  );
}
