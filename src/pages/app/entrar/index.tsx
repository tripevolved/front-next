import { SignUp, PageApp } from "@/features";

export default function SignInRoute() {
  return (
    <PageApp seo={{ title: "Entrar" }}>
      <SignUp />
    </PageApp>
  )
}
