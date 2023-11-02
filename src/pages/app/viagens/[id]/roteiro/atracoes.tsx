import { PageApp, UpdateAttractions } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Editar Atrações do Dia";

export default function TripAttractionsRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}/roteiro/` }} seo={{ title }}>
      <UpdateAttractions />
    </PageApp>
  );
}
