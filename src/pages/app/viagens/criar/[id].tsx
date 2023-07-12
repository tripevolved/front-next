import { TripDetailsPage } from "@/features";
import { PageApp } from "@/features";

export default function TripDetailsPageRoute() {
  return (
    <PageApp seo={{ title: "Detalhes de compra da viagem" }}>
      <TripDetailsPage />
    </PageApp>
  );
}
