import { useAppStore } from "@/core/store";
import { HasCurrentTrip, HasProfile, NoCurrentTrip, NoProfile, PageApp } from "@/features";
import { DashedDivider } from "@/ui";
import { useMemo } from "react";

export function DashboardHome() {
  const {
    name = "viajante",
    hasCurrentTrip,
    travelerProfile,
  } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");

  const statusMessage = useMemo(() => {
    if (!travelerProfile) return "Queremos saber qual é o seu perfil de viagem!";
    if (hasCurrentTrip) return "Você tem uma viagem em aberto.";
    return "Te esperamos na sua próxima viagem.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp
      headerOptions={{
        title: `Olá, ${firstName} 👋`,
        subtitle: statusMessage,
        image: "/brand/logo-symbol-circle.svg",
      }}
      seo={{ title: "Painel" }}
      className="dashboard-home"
    >
      {travelerProfile ? <HasProfile travelerProfile={travelerProfile} /> : <NoProfile />}
      <DashedDivider style={{ padding: "32px 0" }} />
      {hasCurrentTrip ? <HasCurrentTrip /> : <NoCurrentTrip />}
    </PageApp>
  );
}
