import { useAppStore } from "@/core/store";
import { LoginArgs, UserService } from "@/services/user";
import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { Notification } from "mars-ds";
import { useState } from "react";
import { ERRORS } from "./auth-sign-in.constants";
import { useAfterLoginRedirect } from "./use-after-login-redirect.hook";

export const useLogin = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useAppStore();
  const { redirectAfterSignIn } = useAfterLoginRedirect();

  const login: SubmitHandler<LoginArgs> = async (data) => {
    setSubmitting(true);
    setError(false);
    return UserService.login(data)
      .then((user) => {
        setUser(user);
        redirectAfterSignIn();
      })
      .catch(() => {
        Notification.error(ERRORS.UNAUTHORIZED);
        setSubmitting(false);
        setError(true);
      });
  };

  return { login, submitting, error };
};
