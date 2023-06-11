import { useRouter } from "next/router";
import { DASHBOARD_ROUTE } from "../auth-sign-in.constants";

export const useAfterLoginRedirect = () => {
  const router = useRouter();

  const redirectAfterSignIn = () => {
    const redirectTo =
      typeof router.query.redirectTo === "string"
        ? decodeURIComponent(router.query.redirectTo)
        : DASHBOARD_ROUTE;
    router.replace(redirectTo);
  };

  return { redirectAfterSignIn };
};
