import { ToggleButton } from "mars-ds";
import type { NotificationButtonProps } from "./notification-button.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";
import { Box } from "@/ui";
import { useState } from "react";
import { NotificationColumn } from "@/features";

export function NotificationButton({
  className,
  children,
  sx,
  href,
  ...props
}: NotificationButtonProps) {
  const cn = makeCn("notification-button", className)(sx);
  const { hasNotifications } = useAppStore((state) => state.user);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={cn}>
      <ToggleButton
        {...props}
        href={href}
        variant="text"
        iconName="bell"
        title="Notificações"
        onClick={() => setShowSidebar(!showSidebar)}
        className="notification-button__button"
      />
      {hasNotifications && <span className="notification-button__bullet">⏺</span>}
      <Box className={`notification-button__sidebar${showSidebar ? "--active" : ""}`}>
        <NotificationColumn />
      </Box>
    </div>
  );
}
