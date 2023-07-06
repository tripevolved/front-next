import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function PendingDocumentsModal({
  className,
  children,
  sx,
  ...props
}: PendingDocumentsModalProps) {
  const cn = makeCn("pending-documents-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      tem coisa aqui
    </div>
  );
}
