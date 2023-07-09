import { PageApp, TripPaymentPage } from "@/features";

export default function TripPaymentRoute() {
  return (
    <PageApp seo={{ title: "Comprar viagem" }}>
      <TripPaymentPage />
    </PageApp>
  );
}
