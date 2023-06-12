import { useEffect } from "react";
import { useAuthorized } from "./use-authorized";

interface AppAuthProviderProps {
  children: React.ReactNode;
}

export const AppAuthProvider = ({ children }: AppAuthProviderProps) => {
  const { isAuthorized, redirectToSignIn } = useAuthorized();

  useEffect(() => {
    if (!isAuthorized) redirectToSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  // TODO: verify if it is necessary
  //if (!isAuthorized) return <div>Não está logado</div>;

  return <>{children}</>;
};
