import type { SignInProps } from "./sign-in.types";

import { Logo } from "@/components";
import { handleFormSubmit, SubmitHandler } from "@/helpers/form.helpers";
import { css, cx } from "@emotion/css";
import { Card, FormWithSubmitButton, PasswordField, TextField } from "mars-ds";
import style from "./sign-in.module.scss";

interface Login {
  username: string;
  password: string;
}

export function SignIn({ className, children, sx, ...props }: SignInProps) {
  const cn = cx(className, style.section, css(sx));

  const handleSubmit: SubmitHandler<Login> = async (props) => {
    console.log(props)
  }

  return (
    <section className={cn} {...props}>
      <Card elevation="md" className={style.container}>
        <Logo vertical className={style.logo} />
        <FormWithSubmitButton onSubmit={handleFormSubmit(handleSubmit)} className={style.form} submitButtonLabel="Entrar">
          <TextField name="username" label="Usuário" minLength={8} required />
          <PasswordField name="password" label="Senha" minLength={6} required />
        </FormWithSubmitButton>
      </Card>
    </section>
  );
}
