import { Icon, ToggleButton } from "mars-ds";
import type { NotificationButtonProps } from "./notification-button.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";
import { Box } from "@/ui";
import { useState } from "react";
import { NotificationColumn } from "@/features";
import { useRouter } from "next/router";

export function NotificationButton({
  className,
  children,
  sx,
  href,
  ...props
}: NotificationButtonProps) {
  const cn = makeCn("notification-button", className)(sx);
  const { hasNotifications } = useAppStore((state) => state.user);
  const router = useRouter();
  const { pathname, query } = router;

  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggle = () => {
    setShowSidebar(!showSidebar);
    router.replace(
      `${pathname}?hasCurrentTrip=${query.hasCurrentTrip}&showSidebar=${!showSidebar}`
    );
  };

  return (
    <div className={cn}>
      <ToggleButton
        {...props}
        href={href}
        variant="text"
        iconName="bell"
        title="Notificações"
        onClick={() => handleToggle()}
        className="notification-button__button"
      />
      {hasNotifications && <span className="notification-button__bullet">⏺</span>}
      {/* <Box className={`notification-button__sidebar${showSidebar ? "--active" : ""}`}>
        <div className="flex w-100 justify-content-end mb-md">
          <Icon name="x" onClick={() => setShowSidebar(false)} style={{ cursor: "pointer" }} />
        </div>
        <NotificationColumn />
      </Box> */}
    </div>
  );
}
