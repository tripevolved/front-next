import { Avatar } from "mars-ds";
import type { UserAvatarProps } from "./user-avatar.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Text } from "@/ui";

export function UserAvatar({
  className,
  children,
  sx,
  name,
  description,
  image,
  ...props
}: UserAvatarProps) {
  const cn = makeCn("user-avatar", className)(sx);

  return (
    <div className={cn} {...props}>
      <Avatar name={name} thumbnail={image} />
      <div className="user-avatar__content">
        <Text heading as="div" size="xs" className="color-primary">
          {name}
        </Text>
        <Text size="sm" className="color-text-secondary">
          {description}
        </Text>
      </div>
    </div>
  );
}
