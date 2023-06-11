import { UserService } from "@/services/user";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { isProtectedRoute } from "./app-auth.helper";

export const useAuthorized = () => {
  const { asPath, replace: redirect } = useRouter();

  const redirectToSignIn = () => {
    const redirectTo = encodeURIComponent(asPath);
    const pathname = `/app/entrar/?redirectTo=${redirectTo}`;
    redirect(pathname);
  };

  const isAuthorized = useMemo(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    () => !isProtectedRoute(asPath) || UserService.isAuth(),
    [asPath]
  );

  return { isAuthorized, redirectToSignIn };
};
