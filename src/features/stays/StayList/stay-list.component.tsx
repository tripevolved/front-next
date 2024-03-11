import { Divider, Grid } from "mars-ds";

import type { StayListProps } from "@/features";
import { CuratedStayList } from "./curated-stay-list.component";
import { LibraryStayList } from "./library-stay-list.component";

export function StayList({
  tripId,
  itineraryActionId
}: StayListProps) {
  return (
    <Grid columns={[1, 4]}>
      <div>FILTERS</div>
      <div>
        <CuratedStayList tripId={tripId} itineraryActionId={itineraryActionId} />
        <Divider />
        <LibraryStayList tripId={tripId} itineraryActionId={itineraryActionId} />
      </div>
    </Grid>
  );
}
