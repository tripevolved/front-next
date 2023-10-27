import { PageApp, PageAppBody, PageAppHeader, TripAccommodation } from "@/features";
import { useRouter } from "next/router";

const TITLE = "Hospedagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp seo={{ title: TITLE }}>
      <PageAppHeader title={TITLE} backButton href={`/app/viagens/${idParam}`} />
      <PageAppBody>
        <TripAccommodation />
      </PageAppBody>
    </PageApp>
  );
}
