import { Text, Picture } from "@/ui";

import { Card, Grid } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { TripStayListItem } from "@/core/types";

export function LibraryStayListItem({
  stay
}: { stay: TripStayListItem }) {
  return (
    <Card className="curated-stay-list-item">
      <Grid className="pl-lg">
        <Grid columns={{ sm: 1, md: ["180px", "auto"] }}>
          <Picture className="itinerary-item__content__image">
            {stay.coverImage ? parsePhoto(stay.coverImage) : "/assets/blank-image.png"}
          </Picture>
          <div>
            <div className="w-100 flex-column itinerary-item__content__break">
              <Grid gap={4}>
                <Text as="h3" size="xl">
                  <strong>{stay.name}</strong>
                </Text>                  
                <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{stay.tags}</Text>
                {stay.services && (
                  <div className="trip-stay-details__content__service-list">
                    {stay.services.map((service, i) => {
                      return <TripStayServiceItem {...service} key={i} />
                    })}
                  </div>
                )}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}