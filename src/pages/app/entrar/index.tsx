import { AuthSignIn, PageApp } from "@/features";

export default function SignInRoute() {
  return (
    <PageApp seo={{ title: "Entrar" }}>
      <AuthSignIn />
    </PageApp>
  )
}
