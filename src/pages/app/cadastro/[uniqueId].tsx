import {  AuthPasswordConfirmation, PageApp } from "@/features";

export default function SignUpConfirmationRoute() {
  return (
    <PageApp seo={{ title: "Finalizar cadastro" }}>
      <AuthPasswordConfirmation />
    </PageApp>
  );
}
