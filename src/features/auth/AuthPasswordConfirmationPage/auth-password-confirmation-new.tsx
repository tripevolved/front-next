import { EmptyState, Text } from "@/ui";
import { AuthSection } from "../AuthSection";
import { Button, Card, SubmitButton } from "mars-ds";
import { useState } from "react";
import { UserApiService } from "@/services/api/user";
import { useRouter } from "next/router";

export const AuthPasswordConfirmationNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(true);

  const router = useRouter();
  const uniqueIdParam = typeof router.query.uniqueId === "string" ? router.query.uniqueId : undefined;
  const emailParam = typeof router.query.email === "string" ? router.query.email : "";

  const sendNewLink = async () => {
    setSubmitting(true);
    const { email, uniqueId } = await UserApiService.resetUniqueSignUp({ currentEmail: emailParam, currentUniqueId: uniqueIdParam });

    if (email && uniqueId) {
      router.replace(`/app/cadastro/${encodeURIComponent(uniqueId!)}?email=${encodeURIComponent(email)}`);
    } else {
      setSuccess(false);
    }
  };

  if (!success) {
    return (
      <AuthSection heading="Houve um problema com seu cadastro">
        <Card elevation="md" className="auth-section__card">
          <EmptyState text="Não foi possível gerar um novo link para seu cadastro." />
        </Card>
        <Button href="/">Voltar à home</Button>
      </AuthSection>
    );
  }

  return (
    <AuthSection style={{ textAlign: "center" }} heading="Finalizar cadastro" withCard>
      <EmptyState
        heading="Esse link expirou!"
        text="Para gerar um novo link, clique no botão abaixo e você será redirecionado para completar seu cadastro."
      />
      <SubmitButton onClick={sendNewLink} submitting={submitting}>
        Gerar um novo link
      </SubmitButton>
    </AuthSection>
  );
};
