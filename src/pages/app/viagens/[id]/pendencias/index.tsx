import { PageApp, PageAppBody, PageAppHeader, TripPending } from "@/features";
import { useRouter } from "next/router";

const TITLE = "Pendências da viagem"

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp seo={{ title: TITLE }}>
      <PageAppHeader title={TITLE} backButton href={`/app/viagens/${idParam}`} />
      <PageAppBody>
        <TripPending />
      </PageAppBody>
    </PageApp>
  );
}
