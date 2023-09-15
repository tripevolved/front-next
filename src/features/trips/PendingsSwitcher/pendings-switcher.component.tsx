import type { PendingsSwitcherProps } from "./pendings-switcher.types";

import { Text } from "@/ui";
import { useRouter } from "next/router";
import useSWR from "swr";

import { makeCn } from "@/utils/helpers/css.helpers";
import { PageAppBody, PageAppHeader } from "@/features/";
import { TripPendingAction } from "@/core/types";
import { PendingDocumentsModal } from "@/features/dashboard/PendingDocumentsModal";

export function PendingsSwitcher({ className, children, sx, ...props }: PendingsSwitcherProps) {
  const cn = makeCn("pendings-switcher", className)(sx);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;
  const pending_type =
    typeof router.query.pending_type === "string" ? router.query.pending_type : null;

  const getView = (pendingType: TripPendingAction["slug"] | string | null) => {
    return (
      <>
        {pendingType === "viajantes" ? (
          <PendingDocumentsModal tripId={idParam} />
        ) : (
          <Text style={{ color: "#D35050" }}>Tipe de pendência não encontrada...</Text>
        )}
      </>
    );
  };

  return (
    <>
      <PageAppHeader backButton href={`/app/viagens`}>
        <div className="dashboard-home__header">
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Pendências ⚠️
            </Text>
            <Text size="lg">
              {pending_type === "viajantes" ? "Informe quem serão os viajantes" : null}
            </Text>
          </div>
        </div>
      </PageAppHeader>
      <PageAppBody>
        <div className={cn} {...props}>
          {getView(pending_type)}
        </div>
      </PageAppBody>
    </>
  );
}
