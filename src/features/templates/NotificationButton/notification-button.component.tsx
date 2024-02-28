import { ToggleButton } from "mars-ds";
import type { NotificationButtonProps } from "./notification-button.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function NotificationButton({
  className,
  children,
  sx,
  href,
  ...props
}: NotificationButtonProps) {
  const cn = makeCn("notification-button", className)(sx);

  return (
    <div className={cn}>
      <ToggleButton
        {...props}
        href={href}
        variant="text"
        iconName="bell"
        title="Notificações"
        onClick={() => null}
        className="notification-button__button"
      />
      <span className="notification-button__bullet">⏺</span>
    </div>
  );
}
