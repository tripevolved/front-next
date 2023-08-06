import { Text, Box } from "@/ui";
import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function SeeAttractionDetailsModal({
  className,
  children,
  sx,
  attraction,
  ...props
}: SeeAttractionDetailsModalProps) {
  const cn = makeCn("see-attraction-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Box className="see-attraction-details-modal__header">
        <Text heading className="see-attraction-details-modal__header__title">
          {attraction.name}
        </Text>
        <Text className="see-attraction-details-modal__header__subtitle">{"Turismo"}</Text>
      </Box>
    </div>
  );
}
