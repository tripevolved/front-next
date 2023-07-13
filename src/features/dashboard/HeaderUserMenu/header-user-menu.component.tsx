import type { HeaderUserMenuProps } from "./header-user-menu.types";
import { Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";

export function HeaderUserMenu({
  className,
  children,
  userName,
  sx,
  ...props
}: HeaderUserMenuProps) {
  const cn = makeCn("header-user-menu", className)(sx);

  return (
    <div className={cn} {...props}>
      <Text size="sm" heading>
        Olá, {userName} 👋
      </Text>
      {children}
    </div>
  );
}
