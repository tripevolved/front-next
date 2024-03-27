import { useAppStore } from "@/core/store";
import { HasCurrentTrip, NoCurrentTrip, NoProfile, NotificationColumn, PageApp } from "@/features";
import { Grid, Icon } from "mars-ds";
import { useEffect, useMemo, useState } from "react";

const LOGO_IMAGE = "/brand/logo-symbol-circle.svg";

export function DashboardHome() {
  const checkbox = document.getElementById("notification-toggle");
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    name = "viajante",
    hasCurrentTrip,
    travelerProfile,
    availableFeatures,
  } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");
  const title = `Olá, ${firstName} 👋`;
  const subtitle = useMemo(() => {
    if (hasCurrentTrip) return "Você tem uma viagem em aberto.";
    if (!travelerProfile) return "Queremos saber qual é o seu perfil de viajante!";
    return "Te esperamos na sua próxima viagem.";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allowNotifications = availableFeatures
    ? availableFeatures.includes("NOTIFICATIONS")
    : false;

  const closeColumn = () => setShowSidebar(false);

  const mdColumns = allowNotifications ? ["auto", "350px"] : ["auto"];

  const eventAdder = () =>
    checkbox?.addEventListener("click", () => {
      setShowSidebar(!showSidebar);
    });

  useEffect(() => {
    eventAdder();
  }, [checkbox]);

  return (
    <PageApp
      headerOptions={{ title, subtitle, image: LOGO_IMAGE }}
      seo={{ title: "Painel" }}
      className="dashboard-home"
    >
      <Grid columns={{ sm: 1, md: mdColumns }}>
        <Grid>
          {travelerProfile ? null : <NoProfile />}
          {hasCurrentTrip ? <HasCurrentTrip /> : <NoCurrentTrip />}
        </Grid>
        {allowNotifications ? (
          <div className={`dashboard-home__right-column${showSidebar ? "--active" : ""}`}>
            {showSidebar ? (
              <div className="flex w-100 justify-content-end mb-md">
                <Icon name="x" onClick={() => closeColumn()} style={{ cursor: "pointer" }} />
              </div>
            ) : null}
            <NotificationColumn className="p-md" />
          </div>
        ) : null}
      </Grid>
    </PageApp>
  );
}
