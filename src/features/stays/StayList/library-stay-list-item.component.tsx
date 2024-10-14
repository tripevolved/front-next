import { Text, Picture, CardHighlight } from "@/ui";

import { Card, Divider, Grid } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { TripStayListItem } from "@/core/types";

export function LibraryStayListItem({
  stay,
  isRecommended = false,
}: {
  stay: TripStayListItem;
  isRecommended?: boolean;
}) {
  const OutlineElement = ({ children }: React.PropsWithChildren) =>
    isRecommended ? (
      <CardHighlight>{children}</CardHighlight>
    ) : (
      <Card className="curated-stay-list-item">{children}</Card>
    );

  return (
    <OutlineElement>
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
                      return <TripStayServiceItem {...service} key={i} />;
                    })}
                  </div>
                )}
              </Grid>
            </div>
          </div>
        </Grid>
        <Divider style={{ backgroundColor: "var(--color-brand-4)", borderWidth: 2 }} />
      </Grid>
    </OutlineElement>
  );
}
