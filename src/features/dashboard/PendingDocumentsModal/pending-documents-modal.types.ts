import type { ComponentHTMLProps } from "@/core/types";
import type { NextRouter } from "next/router";

export interface PendingDocumentsModalProps extends ComponentHTMLProps {
  tripId: string;
  router?: NextRouter;
  title?: string;
}
