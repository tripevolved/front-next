import { ToggleButton } from "mars-ds";
import type { NotificationButtonProps } from "./notification-button.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";
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
  const { asPath, query } = router;

  const handleToggle = () => {
    router.push(asPath, { query: { ...query, showNotifications: true } });
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
