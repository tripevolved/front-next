import { EmptyState, GlobalLoader, SectionBase, Text } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { useUpdateAttractions } from "./update-attractions.hook";
import { TripScriptDay, UpdateScriptAction } from "@/core/types";
import { TripScriptActionSection } from "../TripScriptAction/trip-script-action.component";
import { Button, Grid, Icon, Modal } from "mars-ds";
import { AddAttractionsModal, PageAppHeader } from "@/features";
import { useState } from "react";
import { TripScriptDaySection } from "../BuildTripScriptStep/trip-script-day.section";
import { TripScriptDayComponent } from "../TripScriptDay";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();
  const [attractionList, setAttractionsList] = useState<UpdateScriptAction[]>(
    [] as UpdateScriptAction[]
    );
    
  const tripIdParam = typeof router.query.id === "string" ? router.query.id : null;
  const redirectTo = String(router.query.redirectTo ?? `/app/viagens/roteiro/${tripIdParam}`);

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
      <PageAppHeader
        backButton
        href={redirectTo}
        title={`Editar ${data.date}`}
      />
      <SectionBase className={cn} {...props}>
        <Grid columns={{md: 2, sm: 1}}>
          <AddAttractionsModal
            tripId={tripIdParam!}
            onClickAttraction={handleAttractionClick}
            onSaveClick={() => updateTripScript(attractionList)}
          />
          <TripScriptDayComponent
            tripId={tripIdParam!}
            day={data.day}
            dayDetail={data}
            addMoreAttractions={false}
          />
        </Grid>
        <div className="update-attractions__list-area">
          {data.actions.map(
            (action, i) =>
              action.isEditable && (
                <TripScriptActionSection
                  action={action}
                  key={i}
                  onClick={() => deleteTripAction(i)}
                >
                  
                </TripScriptActionSection>
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
