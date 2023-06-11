import type { AuthSignInProps } from "./auth-sign-in.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Card, Link, Notification, PasswordField, SubmitButton, TextField } from "mars-ds";
import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { Picture, SectionBase, Text } from "@/ui";
import { type LoginDTO, UserService } from "@/services/api/user";
import { useState } from "react";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";

export function AuthSignIn({ className, children, ...props }: AuthSignInProps) {
  const [submitting, setSubmitting] = useState(false);
  const { setUser } = useAppStore();
  const router = useRouter();

  const cn = makeCn("auth-sign-in", className)();

  const handleSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setSubmitting(true);
    return UserService.login(data)
      .then((user) => {
        setUser(user);
        router.replace("/app/painel");
      })
      .catch(() => {
        Notification.error("E-mail ou senha inválidos.");
        setSubmitting(false);
      });
  };

  return (
    <SectionBase container="xs" className={cn} {...props}>
      <form className="auth-sign-in__element" onSubmit={handleFormSubmit(handleSubmit)}>
        <Picture
          className="auth-sign-in__logo"
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
          />
          <PasswordField name="password" label="Senha" minLength={6} required />
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
