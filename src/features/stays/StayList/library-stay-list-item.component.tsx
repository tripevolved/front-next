import { Text, Picture } from "@/ui";

import { Button, Card, Divider, Grid } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { StayOption } from "@/core/types";
import { Checkbox } from "@/ui/components/forms/Checkbox";
import { useMemo } from "react";

export function LibraryStayListItem({
  stay,
  selected,
  selectedRoomCode,
  setSelectedRoom,
  setSelected,
  isRecommended = false,
}: {
  stay: StayOption;
  selected: boolean;
  selectedRoomCode: string | undefined;
  setSelected: () => void;
  setSelectedRoom: (code: string) => void;
  isRecommended?: boolean;
}) {
  const stars = useMemo(() => {
    const tagsMatches = /(\d.?\d?)/g.exec(stay.tags);
    if (tagsMatches !== null && tagsMatches?.length > 0) {
      return parseInt(tagsMatches[0]);
    }
    return 0;
  }, [stay]);

  const price = useMemo(() => {
    if (stay.details.rooms.length === 0) {
      return 0;
    }
    if (selectedRoomCode === undefined) {
      return stay.details.rooms[0].price;
    }
    const selectedRoom = stay.details.rooms.find(({ code }) => code === selectedRoomCode);
    if (selectedRoom) {
      return selectedRoom.price;
    }
    return 0;
  }, [stay, selectedRoomCode]);

  return (
    <Card
      className={""}
      style={{
        border: selected ? "1px solid var(--color-brand-4)" : "1px solid var(--color-gray-3)",
        backgroundColor: selected ? "var(--color-background-gold)" : "white",
      }}
    >
      <Grid className="pl-lg">
        <Grid columns={["100px", "auto"]}>
          <Picture className="itinerary-item__content__image">
            {stay.coverImage ? parsePhoto(stay.coverImage) : "/assets/blank-image.png"}
          </Picture>
          <div className="w-100 itinerary-item__content__break">
            <Grid gap={4}>
              <Text as="h3" size="xl">
                <div
                  className="flex gap-sm"
                  style={{ color: "var(--color-brand-2)", fontWeight: "bold" }}
                >
                  <strong>{stay.name}</strong>
                  {isRecommended ? (
                    <Picture src="/assets/stays/stay_recommended.svg"></Picture>
                  ) : (
                    <></>
                  )}
                </div>
              </Text>
              <div className="flex flex-row gap-xs">
                {Array(stars)
                  .fill(0)
                  .map((_, index) => {
                    return <Picture key={index} src="/assets/stays/star.svg" />;
                  })}
              </div>
              <Text
                as="h2"
                style={{
                  color: "var(--color-brand-2)",
                  fontWeight: "strong",
                  fontSize: "16px",
                  marginTop: "16px",
                }}
              >
                <strong>{`R$${price}`}</strong>
              </Text>
              {stay.details.services && (
                <div className="trip-stay-details__content__service-list">
                  {stay.details.services.map((service, i) => {
                    return <TripStayServiceItem {...service} key={i} />;
                  })}
                </div>
              )}
            </Grid>
          </div>
        </Grid>
        <Divider
          style={{
            backgroundColor: selected ? "var(--color-brand-4)" : "var(--color-gray-3)",
            borderWidth: 2,
          }}
        />
        <div
          className="w-full flex flex-row"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Checkbox
            onClick={setSelected}
            checked={selected}
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
