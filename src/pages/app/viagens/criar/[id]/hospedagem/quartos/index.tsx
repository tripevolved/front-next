import { PageApp, PageAppBody, TripStayRoomsList } from "@/features";
import { useRouter } from "next/router";

const title = "Quartos da Hospedagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);

  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }}
      seo={{ title: title }}
    >
      <PageAppBody>
        <TripStayRoomsList tripId={idParam} />
      </PageAppBody>
    </PageApp>
  );
}
