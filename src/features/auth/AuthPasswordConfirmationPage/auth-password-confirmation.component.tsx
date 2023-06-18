import { useRouter } from "next/router";
import { AuthPasswordConfirmationForm } from "./auth-password-confirmation.form";
import { useEffect, useState } from "react";
import { EmptyState, GlobalLoader } from "@/ui";
import { delay } from "@/utils/helpers/delay.helpers";
import { Button, Card } from "mars-ds";
import { AuthSection } from "../AuthSection";
import { AuthPasswordConfirmationNew } from "./auth-password-confirmation-new";

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

const usePasswordConfirmationToken = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const queryId = router.query["unique-id"];
  const uniqueId = typeof queryId === "string" ? queryId : undefined;

  const getDataByUniqueId = async () => {
    setIsLoading(true);
    await delay(2000);

    // TODO: implements logic here
    const response = {};
    setIsExpired(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (uniqueId) getDataByUniqueId();
  }, [uniqueId]);

  return {
    isExpired,
    isLoading,
    uniqueId,
  };
};
