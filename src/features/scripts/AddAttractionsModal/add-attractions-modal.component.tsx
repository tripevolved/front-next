import { AddAttractionCard, Box, Text } from "@/ui";
import type { AddAttractionsModalProps } from "./add-attractions-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAddAttractions } from "./add-attractions-modal.hook";

export function AddAttractionsModal({
  className,
  children,
  sx,
  tripId,
  ...props
}: AddAttractionsModalProps) {
  const cn = makeCn("add-attractions-modal", className)(sx);

  const { data, isLoading, error } = useAddAttractions(tripId);

  return (
    <div className={cn} {...props}>
      <Box className="add-attractions-modal__header">
        <Text size="xs" heading className="add-attractions-modal__header__title">
          Adicionar atrações
        </Text>
        <Text className="add-attractions-modal__header__subtitle" size="md">
          Selecione as atrações de seu interesse
        </Text>
      </Box>
      <Box className="add-attractions-modal__list">
        {data.length ? (
          data.map((attraction, i) => <AddAttractionCard attraction={attraction} key={i} />)
        ) : (
          <Text style={{ color: "#D35050" }}>
            Puxa... Não conseguimos encontrar novas atrações para você
          </Text>
        )}
      </Box>
    </div>
  );
}
