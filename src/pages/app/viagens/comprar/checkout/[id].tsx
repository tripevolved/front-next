import { TripCheckout } from "@/features";
import { PageApp } from "@/features";
import { useRouter } from "next/router";

const title = "Comprar viagem";

export default function TripPurchasePageRoute() {
  const router = useRouter();
  const tripId = String(router.query.id);
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${tripId}` }} seo={{ title }}>
      <TripCheckout />
    </PageApp>
  );
}
