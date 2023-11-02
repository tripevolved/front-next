import { PageApp, ReservationsPanel } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Voos e Reservas";

export default function ReservationsRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <ReservationsPanel />
    </PageApp>
  );
}
