import { AddAttractionCard, Box, EmptyState, GlobalLoader, Text } from "@/ui";
import type { AddAttractionsModalProps } from "./add-attractions-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAddAttractions } from "./add-attractions-modal.hook";
import { TripScriptAttraction } from "@/core/types";
import { Button, Modal } from "mars-ds";
import { useState } from "react";
import { SeeAttractionDetailsModal } from "@/features";

export function AddAttractionsModal({
  className,
  children,
  sx,
  tripId,
  ...props
}: AddAttractionsModalProps) {
  const cn = makeCn("add-attractions-modal", className)(sx);

  const [attractionsList, setAttractionsList] = useState<TripScriptAttraction[]>(
    [] as TripScriptAttraction[]
  );

  const { data, isLoading, error } = useAddAttractions(tripId);

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ([] as TripScriptAttraction[])) return <EmptyState />;

  const handleSeeDetails = (attraction: TripScriptAttraction) => {
    Modal.open(() => <SeeAttractionDetailsModal attraction={attraction} />, {
      closable: true,
      size: "md",
    });
  };

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
          data.map((attraction, i) => (
            <AddAttractionCard
              attraction={attraction}
              onAddClick={() => setAttractionsList([...attractionsList, attraction])}
              onViewClick={() => handleSeeDetails(attraction)}
              key={i}
            />
          ))
        ) : (
          <Text style={{ color: "#D35050" }}>
            Puxa... Não conseguimos encontrar novas atrações para você
          </Text>
        )}
      </Box>
      <Button className="add-attractions-modal__save-button">Salvar</Button>
    </div>
  );
}
