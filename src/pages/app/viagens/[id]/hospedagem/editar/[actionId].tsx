import { LibraryStayList, PageApp } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

const title = "Editar Hospedagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = useIdParam();
  const actionId = typeof router.query.actionId === "string" ? router.query.actionId : "";
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}/detalhes` }} seo={{ title }}>
      <LibraryStayList itineraryActionId={actionId} tripId={idParam} />
      {/* <StayList tripId={idParam} itineraryActionId={actionId} /> */}
    </PageApp>
  );
}
