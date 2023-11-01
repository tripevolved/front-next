import { useAppStore } from "@/core/store";
import { HasCurrentTrip, NoCurrentTrip, NoProfile, PageApp } from "@/features";
import { useMemo } from "react";

const LOGO_IMAGE = "/brand/logo-symbol-circle.svg";

export function DashboardHome() {
  const {
    name = "viajante",
    hasCurrentTrip,
    travelerProfile,
  } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");
  const title = `Olá, ${firstName} 👋`;
  const subtitle = useMemo(() => {
    if (!travelerProfile) return "Queremos saber qual é o seu perfil de viagem!";
    if (hasCurrentTrip) return "Você tem uma viagem em aberto.";
    return "Te esperamos na sua próxima viagem.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp
      headerOptions={{ title, subtitle, image: LOGO_IMAGE }}
      seo={{ title: "Painel" }}
      className="dashboard-home"
    >
      {travelerProfile ? null : <NoProfile />}
      {hasCurrentTrip ? <HasCurrentTrip /> : <NoCurrentTrip />}
    </PageApp>
  );
}
