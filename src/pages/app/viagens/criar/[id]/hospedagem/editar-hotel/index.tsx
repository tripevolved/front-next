import { PageApp, TripHotelList } from "@/features";
import { useRouter } from "next/router";

const title = "Editar Hotel";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }} seo={{ title }}>
      <TripHotelList tripId={idParam} />
    </PageApp>
  );
}
