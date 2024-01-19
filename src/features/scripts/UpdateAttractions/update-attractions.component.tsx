import { EmptyState, ErrorState, GlobalLoader, SectionBase } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useUpdateAttractions } from "./update-attractions.hook";
import { TripScriptAction, TripScriptDay } from "@/core/types";
import { Button, Grid } from "mars-ds";
import { AddAttractionsSection } from "@/features";
import { TripScriptDayComponent } from "../TripScriptDay";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();

  const idParam = useIdParam();
  const cameFrom = String(router.query.cameFrom ?? "");

  const { data, setData, error, isLoading, updateTripScript } = useUpdateAttractions();
  const SAVE_ROUTE_BUTTON =
    cameFrom === "dashboard"
      ? `/app/viagens/${idParam}/roteiro`
      : `/app/viagens/${idParam}/roteiro/configurar?day=${data.day}`;

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

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
    <SectionBase className={cn} {...props}>
      <Grid columns={{ md: 2, sm: 1 }}>
        <AddAttractionsSection tripId={idParam!} onClickAttraction={addTripAction} />
        <TripScriptDayComponent
          tripId={idParam!}
          day={data.day}
          dayDetail={data}
          allowMoreAttractions={false}
          allowDelete={true}
          onDelete={deleteTripAction}
        />
      </Grid>
      <Button
        className="update-attractions__save-button"
        href={SAVE_ROUTE_BUTTON}
        onClick={() => updateTripScript()}
      >
        Salvar
      </Button>
    </SectionBase>
  );
}
