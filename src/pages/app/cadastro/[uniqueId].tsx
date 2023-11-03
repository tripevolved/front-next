import {  AuthPasswordConfirmation, PageApp } from "@/features";

export default function SignUpConfirmationRoute() {
  return (
    <PageApp hideHeader seo={{ title: "Finalizar cadastro" }}>
      <AuthPasswordConfirmation />
    </PageApp>
  );
}
