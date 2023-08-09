import { EmptyState, GeneralHeader, GlobalLoader, SectionBase, Text } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { useUpdateAttractions } from "./update-attractions.hook";
import { TripScriptDay, UpdateScriptAction } from "@/core/types";
import { TripScriptActionSection } from "../TripScriptPanel/trip-script-action.section";
import { Button, Modal } from "mars-ds";
import { AddAttractionsModal } from "@/features";
import { useState } from "react";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();
  const [attractionList, setAttractionsList] = useState<UpdateScriptAction[]>(
    [] as UpdateScriptAction[]
  );

  const tripIdParam = typeof router.query.id === "string" ? router.query.id : null;

  const { data, setData, error, isLoading, updateTripScript } = useUpdateAttractions();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ({} as TripScriptDay)) return <EmptyState />;

  const deleteTripAction = (index: number) => {
    const updatedActionList = [...data.actions];

    updatedActionList.splice(index, 1);

    setData({ ...data, actions: updatedActionList });
  };

  const handleAttractionClick = (attraction: UpdateScriptAction) => {
    setAttractionsList([...attractionList, attraction]);
  };

  const handleAddActionButton = () => {
    tripIdParam &&
      Modal.open(
        () => (
          <AddAttractionsModal
            tripId={tripIdParam}
            onClickAttraction={handleAttractionClick}
            onSaveClick={() => updateTripScript(attractionList)}
          />
        ),
        { closable: true }
      );
  };

  return (
    <>
      <GeneralHeader
        backButton
        href={`/app/viagens/roteiro/${tripIdParam}`}
        title={`Editar ${data.date}`}
      />
      <SectionBase className={cn} {...props}>
        <div className="update-attractions__list-area">
          {data.actions.map(
            (action, i) =>
              action.isEditable && (
                <TripScriptActionSection
                  action={action}
                  key={i}
                  isEditPage
                  onClick={() => deleteTripAction(i)}
                />
              )
          )}
          <Button
            className="update-attractions__list-area__add-action-button"
            size="sm"
            variant="naked"
            onClick={() => handleAddActionButton()}
          >
            + Adicionar mais atrações
          </Button>
        </div>
        <Button
          className="update-attractions__save-button"
          onClick={() => updateTripScript(attractionList)}
        >
          Salvar
        </Button>
      </SectionBase>
    </>
  );
}
