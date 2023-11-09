import { EmptyState, Text } from "@/ui";
import { AuthSection } from "../AuthSection";
import { SubmitButton } from "mars-ds";
import { useState } from "react";
import { delay } from "@/utils/helpers/async.helpers";

export const AuthPasswordConfirmationNew = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendNewLink = async () => {
    setSubmitting(true);
    console.log("sendNewLink");
    await delay(1000);
    setSuccess(true);
  };

  if (success) {
    return (
      <AuthSection style={{ textAlign: "center" }} heading="Novo link gerado com sucesso!" withCard>
        <Text>Em breve um e-mail com o novo link chegará eu sua caixa de entrada.</Text>
      </AuthSection>
    );
  }

  return (
    <AuthSection style={{ textAlign: "center" }} heading="Finalizar cadastro" withCard>
      <EmptyState
        heading="Esse link expirou!"
        text="Para gerar um novo link, clique no botão abaixo e espere um novo e-mail chegar para você."
      />
      <SubmitButton onClick={sendNewLink} submitting={submitting}>
        Gerar um novo link
      </SubmitButton>
    </AuthSection>
  );
};
