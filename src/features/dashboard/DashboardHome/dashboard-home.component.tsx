import { useAppStore } from "@/core/store";
import {
  HasCurrentTrip,
  HasProfile,
  NoCurrentTrip,
  NoProfile,
  PageApp,
  PageAppBody,
  PageAppHeader,
} from "@/features";
import { DashedDivider, Text } from "@/ui";
import { Avatar } from "mars-ds";
import { useMemo } from "react";

export function DashboardHome() {
  const { name = "viajante", hasCurrentTrip, travelerProfile } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");

  const statusMessage = useMemo(() => {
    if (!travelerProfile) return "Queremos saber qual é o seu perfil de viagem!";
    if (hasCurrentTrip) return "Você tem uma viagem em aberto.";
    return "Te esperamos na sua próxima viagem.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp seo={{ title: "Painel" }} className="dashboard-home">
      <PageAppHeader>
        <div className="dashboard-home__header">
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Olá, <strong>{firstName}</strong> 👋
            </Text>
            <Text size="lg">{statusMessage}</Text>
          </div>
        </div>
      </PageAppHeader>
      <PageAppBody>
        {travelerProfile ? <HasProfile travelerProfile={travelerProfile} /> : <NoProfile />}
        <DashedDivider style={{ padding: "32px 0" }} />
        {hasCurrentTrip ? <HasCurrentTrip /> : <NoCurrentTrip />}
      </PageAppBody>
    </PageApp>
  );
}
