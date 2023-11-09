import { PageApp, TripHotelList } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Editar Hotel";

export default function TripPendingRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}/detalhes` }} seo={{ title }}>
      <TripHotelList tripId={String(idParam)} />
    </PageApp>
  );
}
