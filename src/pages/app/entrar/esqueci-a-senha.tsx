import { AuthForgotPassword, PageApp } from "@/features";

export default function ForgetPasswordRoute() {
  return (
    <PageApp hideHeader seo={{ title: "Esqueci a senha" }}>
      <AuthForgotPassword />
    </PageApp>
  );
}
