import type { AuthSignInProps } from "./auth-sign-in.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Card, Link, PasswordField, SubmitButton, TextField } from "mars-ds";
import { handleFormSubmit } from "@/utils/helpers/form.helpers";
import { Picture, SectionBase, Text } from "@/ui";
import { useLogin } from "./hooks/use-login";

export function AuthSignIn({ className, children, ...props }: AuthSignInProps) {
  const { login, submitting } = useLogin();

  const cn = makeCn("auth-sign-in", className)();

  return (
    <SectionBase container="xs" className={cn} {...props}>
      <form className="auth-sign-in__element" onSubmit={handleFormSubmit(login)}>
        <Picture
          className="auth-sign-in__logo"
          alt="Logo da Trip Evolved"
          style={{ height: 40, width: 48 }}
          src="/brand/logo-symbol-circle.svg"
        />
        <Text className="auth-sign-in__title" heading size="xs">
          Faça o login para continuar
        </Text>
        <Card elevation="md" className="auth-sign-in__card">
          <TextField
            className="mt-xl"
            type="email"
            name="email"
            label="E-mail"
            minLength={8}
            required
            disabled={submitting}
          />
          <PasswordField
            name="password"
            label="Senha"
            minLength={6}
            required
            disabled={submitting}
          />
          <Link className="auth-sign-in__link" href="/app/entrar/esqueci-a-senha">
            Esqueci a senha
          </Link>
        </Card>
        <SubmitButton submitting={submitting}>Entrar</SubmitButton>
        <Button href="/app/cadastro" variant="naked">
          Criar novo cadastro
        </Button>
      </form>
    </SectionBase>
  );
}
