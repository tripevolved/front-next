import type { ComponentHTMLProps } from "@/core/types";

export interface ProfileSettingsModalProps extends ComponentHTMLProps {
  onClose: VoidFunction;
  isModalView?: boolean;
}
