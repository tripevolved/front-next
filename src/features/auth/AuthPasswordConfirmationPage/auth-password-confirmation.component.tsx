import { AuthPasswordConfirmationForm } from "./auth-password-confirmation.form";
import { GlobalLoader } from "@/ui";
import { AuthPasswordConfirmationNew } from "./auth-password-confirmation-new";
import { usePasswordConfirmationToken } from "./use-password-confirmation.hook";

export function AuthPasswordConfirmation() {
  const { isLoading, isExpired } = usePasswordConfirmationToken();

  if (isLoading) return <GlobalLoader />;

  if (isExpired) return <AuthPasswordConfirmationNew />;

  return <AuthPasswordConfirmationForm />;
}
