import { AddAttractionCard, Box, EmptyState, GlobalLoader, Text } from "@/ui";
import type { AddAttractionsModalProps } from "./add-attractions-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripScriptAttraction } from "@/core/types";
import { Button, Modal } from "mars-ds";
import { SeeAttractionDetailsModal } from "@/features";
import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";

export function AddAttractionsModal({
  className,
  children,
  sx,
  tripId,
  onClickAttraction,
  onSaveClick,
  ...props
}: AddAttractionsModalProps) {
  const cn = makeCn("add-attractions-modal", className)(sx);
  const fetcher = async () => TripScriptsApiService.getAttractions(tripId);

  const { data, isLoading, error } = useSwr(tripId, fetcher);

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ([] as TripScriptAttraction[])) return <EmptyState />;

  const handleSeeDetails = (tripScriptAttraction: TripScriptAttraction) => {
    Modal.open(
      () => (
        <SeeAttractionDetailsModal
          attraction={tripScriptAttraction}
          addAttractionClick={() =>
            onClickAttraction({
              id: tripScriptAttraction.id,
              attractionId: tripScriptAttraction.attractionId,
            })
          }
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
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
          data.map((tripScriptAttraction, i) => (
            <AddAttractionCard
              attraction={tripScriptAttraction}
              onAddClick={() =>
                onClickAttraction({
                  id: tripScriptAttraction.id,
                  attractionId: tripScriptAttraction.attractionId,
                })
              }
              onViewClick={() => handleSeeDetails(tripScriptAttraction)}
              key={i}
            />
          ))
        ) : (
          <Text style={{ color: "#D35050" }}>
            Puxa... Não conseguimos encontrar novas atrações para você
          </Text>
        )}
      </Box>
      <Button className="add-attractions-modal__save-button" onClick={() => onSaveClick()}>
        Salvar
      </Button>
    </div>
  );
}
