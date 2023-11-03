import { useEffect } from "react";
import { AuthSignIn, PageApp } from "@/features";
import { useAuthorized } from "@/core/app-auth/use-authorized";
import { GlobalLoader } from "@/ui";
import { useAfterLoginRedirect } from "@/features/auth/AuthSignIn/use-after-login-redirect.hook";

export default function SignInRoute() {
  const { isAuth } = useAuthorized();
  const { redirectAfterSignIn } = useAfterLoginRedirect();

  useEffect(() => {
    if (isAuth) redirectAfterSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp hideHeader seo={{ title: "Entrar" }}>
      {isAuth ? <GlobalLoader /> : <AuthSignIn />}
    </PageApp>
  );
}
