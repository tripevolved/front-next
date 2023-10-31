import { PageApp, PageAppBody, TripAccommodation } from "@/features";
import { useRouter } from "next/router";

const title = "Hospedagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }} seo={{ title }}>
      <PageAppBody>
        <TripAccommodation />
      </PageAppBody>
    </PageApp>
  );
}
