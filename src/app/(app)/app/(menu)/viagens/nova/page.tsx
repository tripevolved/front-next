import { Suspense } from "react";
import {
  CheckoutTripCreationClient,
  CheckoutTripCreationFallback,
} from "@/components/trips/CheckoutTripCreationClient";

export default function NovaViagemPage() {
  return (
    <Suspense fallback={<CheckoutTripCreationFallback />}>
      <CheckoutTripCreationClient />
    </Suspense>
  );
}

