import { Text, Picture } from "@/ui";

import { Button, Card, Divider, Grid, Modal } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { StayOption, TripStayRoom } from "@/core/types";
import { Checkbox } from "@/ui/components/forms/Checkbox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StayDetailsEditModal } from "../StayDetailsModal/stay-details-edit-modal.component";

export function LibraryStayListItem({
  stay,
  selected,
  selectedRoomCode,
  setSelectedRoom,
  setSelected,
  isRecommended = false,
  tripId,
}: {
  stay: StayOption;
  selected: boolean;
  selectedRoomCode: string | undefined;
  setSelected: () => void;
  setSelectedRoom: (code: string) => void;
  isRecommended?: boolean;
  tripId: string;
}) {
  const [localSelectedRoom, setLocalSelectedRoom] = useState<TripStayRoom | undefined>();
  const stars = useMemo(() => {
    const tagsMatches = /(\d.?\d?)/g.exec(stay.tags);
    if (tagsMatches !== null && tagsMatches?.length > 0) {
      return parseInt(tagsMatches[0]);
    }
    return 0;
  }, [stay]);

  useEffect(() => {
    const selectedRoom = stay.details.rooms.find(({ code }) => code === selectedRoomCode);
    if (stay.details.rooms.length === 0) {
      setLocalSelectedRoom(undefined);
    } else if (selectedRoomCode === undefined) {
      setLocalSelectedRoom(stay.details.rooms[0]);
    } else if (selectedRoom) {
      setLocalSelectedRoom(selectedRoom);
    } else setLocalSelectedRoom(undefined);
  }, [stay.details.rooms, selectedRoomCode]);

  const handleDetails = () => {
    const modal = Modal.open(
      () => (
        <StayDetailsEditModal
          tripId={tripId}
          tripStay={stay}
          itineraryActionId={stay.id}
          key={stay.id}
          selectedRoom={localSelectedRoom?.code}
          setSelectedRoom={(code) => {
            setSelectedRoom(code);
            modal.close();
          }}
        />
      ),
      {
        closable: true,
        size: "sm",
        onClose: () => {},
      }
    );
  };

  const handleSelect = () => {
    setSelected();
    handleDetails();
  };

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
          <div>
            <Picture className="itinerary-item__content__image">
              {stay.coverImage ? parsePhoto(stay.coverImage) : "/assets/blank-image.png"}
            </Picture>
          </div>
          <div className="w-100 itinerary-item__content__break">
            <Grid gap={4}>
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
                <strong>{`R$${localSelectedRoom?.price ?? 0}`}</strong>
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
            onClick={handleSelect}
            checked={selected}
            label={selected ? "Selecionado" : "Selecionar este"}
          />
          <Button
            variant="naked"
            className="trip-stay-section__content__details-text"
            onClick={handleDetails}
          >
            Ver detalhes
          </Button>
        </div>
      </Grid>
    </Card>
  );
}
