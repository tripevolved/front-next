import { PageApp, AllTripsPanel } from "@/features";

export default function AllTripsPanelRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <AllTripsPanel />
    </PageApp>
  );
}
