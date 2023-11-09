import { TripPurchasePage } from "@/features";
import { PageApp } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Comprar viagem";

export default function TripPurchasePageRoute() {
  const idParam = useIdParam();
  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/${idParam}/detalhes/` }}
      seo={{ title }}
    >
      <TripPurchasePage />
    </PageApp>
  );
}
