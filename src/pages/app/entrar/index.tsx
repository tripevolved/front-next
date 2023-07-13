import { useEffect } from "react";
import { AuthSignIn, PageApp } from "@/features";
import { useAuthorized } from "@/core/app-auth/use-authorized";
import { GlobalLoader } from "@/ui";
import { useRouter } from "next/router";

export default function SignInRoute() {
  const { isAuth } = useAuthorized();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.replace("/app/painel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp seo={{ title: "Entrar" }}>{isAuth ? <GlobalLoader /> : <AuthSignIn />}</PageApp>
  );
}
