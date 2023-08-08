import { PageApp, UpdateAttractions } from "@/features";

export default function TripAttractionsRoute() {
  return (
    <PageApp seo={{ title: "Editar Atrações do Dia" }}>
      <UpdateAttractions />
    </PageApp>
  );
}
