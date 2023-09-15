import { PageApp, TripPendings } from "@/features";

export default function TripPendingRoute() {
  return (
    <PageApp seo={{ title: "Pendências da Viagem" }}>
      <TripPendings />
    </PageApp>
  );
}
