import { PageTrip, ProfileSettingsModal } from "@/features/";
import type { ProfileBuilderProps } from "./profile-builder.types";

import { useRouter } from "next/router";
import { Notification } from "mars-ds";

export function ProfileBuilder({ className, children, sx, ...props }: ProfileBuilderProps) {
  const router = useRouter();

  const handleFinishProcess = () => {
    Notification.success("Encontramos o seu perfil de viajante!");
    router.replace("/app/painel/");
  };

  return (
    <PageTrip backToText="Voltar para o painel" backToUrl="/app/painel">
      <ProfileSettingsModal onClose={() => handleFinishProcess()} />
    </PageTrip>
  );
}
