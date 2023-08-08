import { PageApp, MatchedDestinationsPage } from "@/features";

export default function MatchedDestinationsPageRoute() {
  return (
    <PageApp seo={{ title: "Descobrir viagem" }}>
      <MatchedDestinationsPage />
    </PageApp>
  );
}
