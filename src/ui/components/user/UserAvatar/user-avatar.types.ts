import type { ComponentHTMLProps } from "@/core/types";

export interface UserAvatarProps extends ComponentHTMLProps {
  name?: string;
  description?: string;
  image?: string;
}
