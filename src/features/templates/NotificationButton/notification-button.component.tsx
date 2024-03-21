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
  const user = useAppStore((state) => state.user);
  const { updateUser } = useAppStore((state) => state);
  const { hasNotifications, showNotifications } = user;

  const handleToggle = () => {
    updateUser({ ...user, showNotifications: !showNotifications });
  };

  return (
    <div className={cn}>
      <ToggleButton
        {...props}
        type="button"
        href={href}
        variant="text"
        iconName="bell"
        title="Notificações"
        onClick={() => handleToggle()}
        className="notification-button__button"
      />
      {hasNotifications && <span className="notification-button__bullet">⏺</span>}
    </div>
  );
}
