import { useState } from "react";
import { Link, Notification, PasswordField, PasswordStrongField, TextField } from "mars-ds";
import { Text } from "@/ui";
import { AuthFormSection } from "../AuthFormSection";

import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { UserApiService } from "@/services/api/user";
import { useRouter } from "next/router";

type PasswordResetData = Record<string, string>;

export function AuthForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordOK, setPasswordOK] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [data, setData] = useState<PasswordResetData>({});

  const router = useRouter();

  const passwordConfirmationOK = data["password"] === data["passwordConfirmation"];
  const isValid = passwordOK && passwordConfirmationOK;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setData((state: PasswordResetData) => ({ ...state, [name]: value }));
  };

  const handleSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    try {
      setSubmitting(true);
      const { userId } = await UserApiService.forgotPassword(email);
      setUserId(userId);
      setSubmitting(false);
      setSuccess(true);
    } catch (error) {
      setSubmitting(false);
      Notification.error(
        "Não foi possível continuar. Verifique se o e-mail informado está correto."
      );
    }
  };

  const handleSubmitReset: SubmitHandler<{ password: string, confirmationCode: string }> = async ({ password, confirmationCode}) => {
    setSubmitting(true);
    await UserApiService.resetPassword(userId ?? "", password, confirmationCode);
    Notification.success("Senha alterada com sucesso!");
    router.replace("/app/entrar");
  };

  if (success) {
    return (
      <AuthFormSection
        heading="E-mail enviado!"
        submitting={submitting}
        submitButton={{ label: "Resetar senha", disabled: !isValid }}
        onSubmitHandler={handleSubmitReset}
      >
        <Text size="lg">Em breve um e-mail com o novo link chegará eu sua caixa de entrada.</Text>
        <Text size="sm">Então, basta você informar o código de verificação recebido.</Text>
        <TextField name="confirmationCode" type="number" label="Código de verificação" required />
        <PasswordStrongField
          name="password"
          required
          onValid={setPasswordOK}
          onChange={handleChange}
        />
        <PasswordField
          label="Confirme a sua senha"
          name="passwordConfirmation"
          minLength={8}
          onChange={handleChange}
          error={!passwordConfirmationOK}
          required
          disabled={submitting}
        />
      </AuthFormSection>
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
        enviaremos por e-mail um código de verificação.
      </Text>
      <TextField name="email" type="email" label="E-mail" required />
    </AuthFormSection>
  );
}
