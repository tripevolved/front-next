import { AuthForgotPassword, PageApp } from "@/features";

export default function ForgetPasswordRoute() {
  return (
    <PageApp seo={{ title: "Esqueci a senha" }}>
      <AuthForgotPassword />
    </PageApp>
  );
}
