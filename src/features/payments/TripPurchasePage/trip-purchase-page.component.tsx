import { EmptyState, GlobalLoader, ErrorState } from "@/ui";
import { Container } from "mars-ds";

import { useIdParam } from "@/utils/hooks/param.hook";
import { usePurchase } from "./trip-purchase-page.hook";
import { TripPurchaseForm } from "../TripPurchaseForm";
import { PageApp } from "@/features/templates/PageApp";

export function TripPurchasePage() {
  const tripId = useIdParam();
  const { isLoading, data, error } = usePurchase(tripId);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  return (
    <PageApp hideHeader seo={{ title: "Comprar viagem" }}>
      <Container container="sm">
        <TripPurchaseForm {...data} />
      </Container>
    </PageApp>
  );
}
