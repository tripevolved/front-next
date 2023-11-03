import { useState } from "react";
import { useRouter } from "next/router";

import { PasswordField, PasswordStrongField, Card, Button, ToggleSwitch, Link } from "mars-ds";
import { AuthSection } from "../AuthSection";
import { AuthFormSection } from "../AuthFormSection";
import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { UserApiService } from "@/services/api/user";
import { SignUpResponse } from "@/services/api/user/sign-up";
import { EmptyState } from "@/ui";

type PasswordConfirmationData = Record<string, string>;

export function  AuthPasswordConfirmationForm() {
  const { submitting, error, signUpResponse, confirmAccount } = useAccountConfirmation();
  const [data, setData] = useState<PasswordConfirmationData>({});
  const [passwordOK, setPasswordOK] = useState(false);
  const [terms, setTerms] = useState(false);

  const router = useRouter();

  const passwordConfirmationOK = data["password"] === data["passwordConfirmation"];
  const isValid = passwordOK && passwordConfirmationOK && terms;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setData((state: PasswordConfirmationData) => ({ ...state, [name]: value }));
  };

  if (error || (signUpResponse && !signUpResponse.isSignUpSuccessful)) {
    return (
      <AuthSection heading="Houve um problema com seu cadastro">
        <Card elevation="md" className="auth-section__card">
          <EmptyState text={signUpResponse?.message} />
        </Card>
        <Button href="/">Voltar à home</Button>
      </AuthSection>
    );
  }

  if (signUpResponse && signUpResponse.isSignUpSuccessful){
    router.replace("/app/entrar");
  }

  return (
    <AuthFormSection
      heading="Defina sua senha para continuar"
      submitting={submitting}
      onSubmitHandler={confirmAccount}
      submitButton={{ children: "Continuar", disabled: !isValid }}
    >
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
      <ToggleSwitch label="Ao concluir seu cadastro, você concorda com nossos termos de uso e aviso de privacidade" defaultChecked={false} onChange={(checked) => setTerms(checked)}/>
      <Link target="_blank" href={`https://www.tripevolved.com.br/termos-de-uso/`} iconName="external-link">Ver termos de uso</Link>
      <Link target="_blank" href={`https://www.tripevolved.com.br/politica-de-privacidade/`} iconName="external-link">Ver aviso de privacidade</Link>
    </AuthFormSection>
  );
}

const useAccountConfirmation = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [signUpResponse, setSignUpResponse] = useState<SignUpResponse>();

  const router = useRouter();
  const uniqueIdParam = typeof router.query.uniqueId === "string" ? router.query.uniqueId : null;
  const emailParam = typeof router.query.email === "string" ? router.query.email : "";

  const confirmAccount: SubmitHandler<{ password: string }> = ({ password }) => {
    setSubmitting(true);
    setError(false);

    return UserApiService.signUp({ email: emailParam, password, signUpUniqueId: uniqueIdParam })
      .then(setSignUpResponse)
      .catch(() => {
        setError(true);
      });
  };

  return { submitting, error, signUpResponse, confirmAccount };
};
