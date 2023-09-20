import { Text } from "@/ui";
import { useRouter } from "next/router";
import { PendingDocumentsModal } from "@/features";

export function PendingSwitcher() {
  const router = useRouter();
  const idParam = String(router.query.id);
  const pendingType = String(router.query.pendingType);

  const travelType = pendingType === "viajantes";

  if (travelType) return <PendingDocumentsModal tripId={idParam} />;
  return <Text style={{ color: "#D35050" }}>Pendência não encontrada...</Text>;
}
