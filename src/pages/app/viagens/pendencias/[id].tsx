import { PageApp, TripPendings } from "@/features";

export default function TripPendingRoute() {
  return (
    <PageApp seo={{ title: "Pedências da Viagem" }}>
      <TripPendings />
    </PageApp>
  );
}
