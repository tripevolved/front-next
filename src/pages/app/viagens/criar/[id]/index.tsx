import { TripDetailsPage } from "@/features";
import { PageApp } from "@/features";

export default function TripDetailsPageRoute() {
  return (
    <PageApp
      headerOptions={{ title: "Viagem", backUrl: "/app/painel" }}
      seo={{ title: "Detalhes de compra da viagem" }}
    >
      <TripDetailsPage />
    </PageApp>
  );
}
