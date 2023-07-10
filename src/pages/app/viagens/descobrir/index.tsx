import { PageApp, TripDiscoverPage } from "@/features";

export default function TripDiscoverPageRoute() {
  return (
    <PageApp seo={{ title: "Descobrir viagem" }}>
      <TripDiscoverPage />;
    </PageApp>
  );
}
