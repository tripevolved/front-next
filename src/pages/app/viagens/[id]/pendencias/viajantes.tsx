import { PageApp, PendingDocumentsModal } from "@/features";
import { useRouter } from "next/router";

const title = "Pendências da Viagem";

export default function TripPendingTravelerRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);

  return (
    <PageApp
      headerOptions={{
        title,
        subtitle: "Dados dos viajantes",
        backUrl: `/app/viagens/${idParam}/pendencias`,
      }}
      seo={{ title }}
    >
      <PendingDocumentsModal tripId={idParam} router={router} />
    </PageApp>
  );
}
