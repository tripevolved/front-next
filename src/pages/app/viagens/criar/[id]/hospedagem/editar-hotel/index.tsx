import { PageApp, PageAppBody, PageAppHeader, TripHotelList } from "@/features";
import { useRouter } from "next/router";

const TITLE = "Editar Hotel";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);
  return (
    <PageApp seo={{ title: TITLE }}>
      <PageAppHeader title={TITLE} backButton href={`/app/viagens/${idParam}`} />
      <PageAppBody>
        <TripHotelList tripId={idParam} />
      </PageAppBody>
    </PageApp>
  );
}
