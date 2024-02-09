import type { ProfileSettingsModalProps } from "./profile-settings-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function ProfileSettingsModal({
  className,
  children,
  sx,
  onClose,
  ...props
}: ProfileSettingsModalProps) {
  const cn = makeCn("profile-settings-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
}
