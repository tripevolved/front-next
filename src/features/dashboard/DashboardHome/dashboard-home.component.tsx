import { useAppStore } from "@/core/store";
import { HasCurrentTrip, NoCurrentTrip, NoProfile, NotificationColumn, PageApp } from "@/features";
import { Grid, Sidebar } from "mars-ds";
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
    if (hasCurrentTrip) return "Você tem uma viagem em aberto.";
    if (!travelerProfile) return "Queremos saber qual é o seu perfil de viajante!";
    return "Te esperamos na sua próxima viagem.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp
      headerOptions={{ title, subtitle, image: LOGO_IMAGE }}
      seo={{ title: "Painel" }}
      className="dashboard-home"
    >
      <Grid columns={{ sm: 1, md: ["auto", "350px"] }}>
        <Grid>
          {travelerProfile ? null : <NoProfile />}
          {hasCurrentTrip ? <HasCurrentTrip /> : <NoCurrentTrip />}
        </Grid>
        <div className="dashboard-home__right-column">
          <NotificationColumn className="p-md" />
        </div>
      </Grid>
    </PageApp>
  );
}
