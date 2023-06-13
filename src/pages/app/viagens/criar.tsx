import { PageApp, TripBuilderPage } from "@/features";

export default function TripCreatePageRoute() {
  return (
    <PageApp seo={{ title: "Criar viagem" }}>
      <TripBuilderPage />;
    </PageApp>
  );
}
