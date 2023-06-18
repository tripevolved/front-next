import { AuthPasswordConfirmationForm } from "./auth-password-confirmation.form";
import { EmptyState, GlobalLoader } from "@/ui";
import { Button, Card } from "mars-ds";
import { AuthSection } from "../AuthSection";
import { AuthPasswordConfirmationNew } from "./auth-password-confirmation-new";
import { usePasswordConfirmationToken } from "./use-password-confirmation.hook";

export function AuthPasswordConfirmation() {
  const { isLoading, uniqueId, isExpired } = usePasswordConfirmationToken();

  if (!uniqueId) {
    return (
      <AuthSection style={{ textAlign: "center" }} heading="Não foi possível prosseguir!">
        <Card elevation="md">
          <EmptyState />
        </Card>
        <Button href="/" iconName="arrow-left" variant="neutral">
          Voltar ao início
        </Button>
      </AuthSection>
    );
  }

  if (isLoading) return <GlobalLoader />;

  if (isExpired) return <AuthPasswordConfirmationNew />

  return <AuthPasswordConfirmationForm />;
}

