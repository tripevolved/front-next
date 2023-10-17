import { EmptyState, GlobalLoader, SectionBase, Text } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { useUpdateAttractions } from "./update-attractions.hook";
import { TripScriptAction, TripScriptDay, UpdateScriptAction } from "@/core/types";
import { Button, Grid, Modal } from "mars-ds";
import { AddAttractionsModal, PageAppHeader } from "@/features";
import { TripScriptDayComponent } from "../TripScriptDay";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();
  
  const tripIdParam = typeof router.query.id === "string" ? router.query.id : null;
  const redirectTo = String(router.query.redirectTo ?? `/app/viagens/roteiro/${tripIdParam}`);
  
  const { data, setData, error, isLoading, updateTripScript } = useUpdateAttractions();
  
  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ({} as TripScriptDay)) return <EmptyState />;

  const deleteTripAction = (index: number) => {
    const updatedActionList = [...data.actions];
    updatedActionList.splice(index, 1);

    setData({ ...data, actions: updatedActionList } as TripScriptDay);
  };

  const addTripAction = (attraction: TripScriptAction) => {
    const updatedActionList = [...data.actions];
    updatedActionList.push(attraction);

    setData({ ...data, actions: updatedActionList });
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
            onClickAttraction={addTripAction}
          />
          <TripScriptDayComponent
            tripId={tripIdParam!}
            day={data.day}
            dayDetail={data}
            allowMoreAttractions={false}
            allowDelete={true}
            onDelete={deleteTripAction}
          />
        </Grid>
        <Button className="update-attractions__save-button" onClick={() => { updateTripScript(); /*router.push(redirectTo);*/ }}>
          Salvar
        </Button>
      </SectionBase>
    </>
  );
}
