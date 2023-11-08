import { PageApp, TripStayRoomsList } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Quartos da Hospedagem";

export default function TripPendingRoute() {
  const idParam = useIdParam();

  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/${idParam}/detalhes/` }}
      seo={{ title: title }}
    >
      <TripStayRoomsList tripId={String(idParam)} />
    </PageApp>
  );
}
