import { TripPurchasePage } from "@/features";
import { PageApp } from "@/features";

export default function TripPurchasePageRoute() {
  return (
    <PageApp seo={{ title: "Comprar viagem" }}>
      <TripPurchasePage />
    </PageApp>
  );
}
