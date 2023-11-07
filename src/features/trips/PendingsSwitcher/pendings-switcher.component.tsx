import { EmptyState } from "@/ui";
import { useRouter } from "next/router";
import { PendingDocumentsModal } from "@/features";

export function PendingSwitcher() {
  const router = useRouter();
  const idParam = String(router.query.id);
  const pendingType = String(router.query.pendingType);

  const isTravelType = pendingType === "viajantes";
  if (!isTravelType) return <EmptyState text="Pendência não encontrada" />;
  return <PendingDocumentsModal tripId={idParam} router={router} />;
}
