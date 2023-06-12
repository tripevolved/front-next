import { PageApp, TripBuilder } from "@/features";

export default function TripCreatePageRoute() {
  return (
    <PageApp seo={{ title: "Criar viagem" }}>
      <TripBuilder />;
    </PageApp>
  );
}
