import { Link, PasswordField, TextField } from "mars-ds";
import { useLogin } from "./use-login.hook";
import { AuthFormSection } from "../AuthFormSection";

export function AuthSignIn() {
  const { login, submitting } = useLogin();

  return (
    <AuthFormSection
      heading="Faça o login para continuar"
      submitting={submitting}
      onSubmitHandler={login}
      submitButton={{ children: "Entrar" }}
      buttonActions={[
        {
          href: "/app/cadastro",
          label: "Criar novo cadastro",
        },
      ]}
    >
      <TextField
        className="mt-xl"
        type="email"
        name="email"
        label="E-mail"
        minLength={8}
        required
        disabled={submitting}
      />
      <PasswordField name="password" label="Senha" minLength={6} required disabled={submitting} />
      <Link className="auth-sign-in__link" href="/app/entrar/esqueci-a-senha">
        Esqueci a senha
      </Link>
    </AuthFormSection>
  );
}
