import { Box, ErrorState, GlobalLoader, StateTemplate, Text } from "@/ui";
import type { AddAttractionsSectionProps } from "./add-attractions-section.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripScriptAction, TripScriptAttraction } from "@/core/types";
import { Icon, Modal } from "mars-ds";
import { SeeAttractionDetailsModal, TripScriptActionSection } from "@/features";
import useSwr from "swr";
import { TripScriptsApiService } from "@/services/api";

const toTripScriptAction = (tripScriptAttraction: TripScriptAttraction) => {
  return {
    id: null,
    iconSlug: "attraction",
    title: tripScriptAttraction.name,
    subtitle: tripScriptAttraction.address,
    tooltip: null,
    attractionId: tripScriptAttraction.id,
    attractionPartnerSlug: null,
    isSelected: true,
    isEditable: true
  } as TripScriptAction;
}

export function AddAttractionsSection({
  className,
  children,
  sx,
  tripId,
  onClickAttraction,
  ...props
}: AddAttractionsSectionProps) {
  const cn = makeCn("add-attractions-section", className)(sx);
  const fetcher = async () => TripScriptsApiService.getAttractions(tripId);

  const { data, isLoading, error } = useSwr(tripId, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ([] as TripScriptAttraction[])) return <ErrorState />;

  const handleSeeDetails = (tripScriptAttraction: TripScriptAttraction) => {
    Modal.open(
      () => (
        <SeeAttractionDetailsModal
          attraction={tripScriptAttraction}
          addAttractionClick={tripScriptAttraction.isAlreadySelected ? undefined : () => {
            onClickAttraction(toTripScriptAction(tripScriptAttraction));
            tripScriptAttraction.isAlreadySelected = true;
          }}
        />
      ),
      {
        closable: true,
        size: "lg",
      }
    );
  };

  return (
    <div className={cn} {...props}>
      <Box className="add-attractions-section__header">
        <Text size="xs" heading className="add-attractions-section__header__title">
          Adicionar atrações
        </Text>
        <Text className="add-attractions-section__header__subtitle" size="md">
          Selecione as atrações de seu interesse
        </Text>
      </Box>
      <Box className="add-attractions-section__list">
        {data.length ? (
          data.map((tripScriptAttraction, i) => (
            <TripScriptActionSection
              key={i}
              action={toTripScriptAction(tripScriptAttraction)}
              onClick={() => handleSeeDetails(tripScriptAttraction)}
              alreadySelected={tripScriptAttraction.isAlreadySelected}
            >
              <Icon
                name="plus-circle"
                color="var(--color-brand-1)"
              />
            </TripScriptActionSection>
          ))
        ) : (
          <StateTemplate text={"Infelizmente não conseguimos encontrar novas atrações para você"} />
        )}
      </Box>
    </div>
  );
}
