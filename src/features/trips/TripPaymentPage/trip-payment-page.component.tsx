import { TripContactInformationSection } from "./trip-contact-information.section";
import { TripPaymentMethodSection } from "./trip-payment-method.section";
import { TripPayerSection } from "./trip-payer.section";
import { TripPayerAddressSection } from "./trip-payer-address.section";
import { EmptyState, GlobalLoader, Box, Text, SectionBase, Button } from "@/ui";

export function TripPaymentPage() {

  // if (error) return <EmptyState />;
  // if (isLoading) return <GlobalLoader />;
  // if (data === undefined) return <EmptyState />;

  return (
    <>
      <SectionBase className="trip-payment-information">
        <TripPayerSection />
        <TripContactInformationSection />
        <TripPayerAddressSection />
        <TripPaymentMethodSection />
      </SectionBase>
      <SectionBase className="what-includes-section" columns={{ md: ["720px"], lg: ["1020px"] }}>
        <Button backgroundColor="var(--color-brand-1)" color="var(--color-gray-4)">
          Comprar a viagem
        </Button>
      </SectionBase>
    </>
  );
}
