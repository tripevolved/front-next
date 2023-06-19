import { useState } from "react";
import { Link, Notification, TextField } from "mars-ds";
import { Text } from "@/ui";

import { AuthSection } from "../AuthSection";
import { AuthFormSection } from "../AuthFormSection";

import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { UserApiService } from "@/services/api/user";

export function AuthForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    try {
      setSubmitting(true);
      await UserApiService.forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      Notification.error(
        "Não foi possível continuar. Verifique se o e-mail informado está correto."
      );
    }
  };

  if (success) {
    return (
      <AuthSection withCard heading="E-mail envidado!">
        <Text>Em breve um e-mail com o novo link chegará eu sua caixa de entrada.</Text>
      </AuthSection>
    );
  }

  return (
    <AuthFormSection
      heading="Recuperação de senha"
      submitting={submitting}
      submitButton={{ label: "Continuar" }}
      onSubmitHandler={handleSubmit}
    >
      <Link iconName="arrow-left" href="/app/entrar">
        Voltar
      </Link>
      <Text>
        Para redefinir sua senha, informe o seu endereço de e-mail cadastrado para a sua conta e lhe
        enviaremos por e-mail um link com as instruções.
      </Text>
      <TextField name="email" type="email" label="E-mail" required />
    </AuthFormSection>
  );
}
