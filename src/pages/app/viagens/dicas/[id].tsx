import { PageApp } from "@/features";
import { EmptyState } from "@/ui";

export default function ReservationsRoute() {
  return (
    <PageApp seo={{ title: "Dicas" }}>
      <EmptyState />
    </PageApp>
  );
}
