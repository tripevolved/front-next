import type { ComponentHTMLProps } from "@/core/types";
import { DropdownMenuItemProps } from "mars-ds";

export interface NotificationColumnProps extends ComponentHTMLProps {}

export interface DropdownNotificationFiltersProps {
  list: DropdownMenuItemProps[];
}
