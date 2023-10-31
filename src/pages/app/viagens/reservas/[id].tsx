import { PageApp, ReservationsPanel } from "@/features";
import { useRouter } from "next/router";

const title = "Voos e Reservas";

export default function ReservationsRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <ReservationsPanel />
    </PageApp>
  );
}
