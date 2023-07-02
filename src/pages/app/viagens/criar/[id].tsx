import { TripDetailsPage } from "@/features";
import { PageApp } from "@/features";

export default function TripDetailsPageRoute() {
  return (
    <PageApp seo={{ title: "Detalhes da viagem" }}>
      <TripDetailsPage />
    </PageApp>
  );
}
