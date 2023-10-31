import { PageApp, UpdateAttractions } from "@/features";
import { useRouter } from "next/router";

const title = "Editar Atrações do Dia";

export default function TripAttractionsRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/roteiro/${idParam}` }} seo={{ title }}>
      <UpdateAttractions />
    </PageApp>
  );
}
