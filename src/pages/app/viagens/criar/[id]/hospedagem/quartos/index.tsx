import { PageApp, PageAppBody, PageAppHeader, TripStayRoomsList } from "@/features";
import { useRouter } from "next/router";

const TITLE = "Quartos da Hospedagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);
  return (
    <PageApp seo={{ title: TITLE }}>
      <PageAppHeader title={TITLE} backButton href={`/app/viagens/criar/${idParam}`} />
      <PageAppBody>
        <TripStayRoomsList tripId={idParam} />
      </PageAppBody>
    </PageApp>
  );
}
