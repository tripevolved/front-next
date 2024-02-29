import { useAnimation } from "@/utils/hooks/animation.hook";
import { DropdownMenu, ToggleButton } from "mars-ds";
import { useState } from "react";
import { DropdownNotificationFiltersProps } from "./notification-column.types";

export const DropdownNotificationFilters = ({ list }: DropdownNotificationFiltersProps) => {
  const [visible, setVisible] = useState(false);
  const animation = useAnimation();

  const handleClick = () => animation.trigger(visible, () => setVisible(!visible));

  return (
    <div className="dropdown-notification-filters">
      <ToggleButton iconName="sliders" onClick={() => handleClick()} size="sm" />
      {visible && (
        <div style={animation.style} className="dropdown-notification-filters__options m-sm">
          <DropdownMenu
            list={[
              ...list.map((item) => ({
                ...item,
                onClick: (e: any) => {
                  item.onClick?.(e);
                  handleClick();
                },
              })),
            ]}
          />
        </div>
      )}
    </div>
  );
};
