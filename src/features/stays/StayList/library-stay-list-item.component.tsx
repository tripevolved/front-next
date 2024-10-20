import { Text, Picture, OptionField } from "@/ui";

import { Button, Card, Divider, Grid } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { TripStay } from "@/core/types";

export function LibraryStayListItem({
  stay,
  selected,
  setSelected,
  isRecommended = false,
}: {
  stay: TripStay;
  selected: boolean;
  setSelected: () => void;
  isRecommended?: boolean;
}) {
  return (
    <Card
      className={"curated-stay-list-item"}
      style={{ borderColor: selected ? " var(--color-brand-4" : "var(--color-gray-3)" }}
    >
      <Grid className="pl-lg">
        <Grid columns={{ sm: 1, md: ["180px", "auto"] }}>
          <Picture className="itinerary-item__content__image">
            {stay.coverImage ? parsePhoto(stay.coverImage) : "/assets/blank-image.png"}
          </Picture>
          <div>
            <div className="w-100 flex-column itinerary-item__content__break">
              <Grid gap={4}>
                <Text as="h3" size="xl">
                  <div className="flex gap-sm">
                    <strong>{stay.name}</strong>
                    {isRecommended ? (
                      <Picture src="/assets/stays/stay_recommended.svg"></Picture>
                    ) : (
                      <></>
                    )}
                  </div>
                </Text>
                <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{stay.tags}</Text>
                {stay.details.services && (
                  <div className="trip-stay-details__content__service-list">
                    {stay.details.services.map((service, i) => {
                      return <TripStayServiceItem {...service} key={i} />;
                    })}
                  </div>
                )}
              </Grid>
            </div>
          </div>
        </Grid>
        <Divider
          style={{
            backgroundColor: selected ? "var(--color-brand-4)" : " var(--color-gray-3)",
            borderWidth: 2,
          }}
        />
        <div
          className="w-full flex flex-row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <OptionField
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
            }}
            key={stay.id}
            checked={selected}
            multiselect={false}
            onCheck={setSelected}
            value={stay.name}
            label={selected ? "Selecionado" : "Selecionar este"}
          />
          <Button
            variant="naked"
            className="trip-stay-section__content__details-text"
            onClick={() => {}}
          >
            Ver detalhes
          </Button>
        </div>
      </Grid>
    </Card>
  );
}
