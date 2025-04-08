import { useState } from "react";

import type { StepComponentProps } from "@/features";
import { IncrementField, Text } from "@/ui";
import { Button, Grid, SubmitButton } from "mars-ds";

import { formatToPlural } from "@/utils/helpers/number.helpers";

export function StepRoomChoice({
  onNext,
  onPrevious,
  travelersIntermediate,
  rooms,
}: StepComponentProps) {
  const [submitting, setSubmitting] = useState(false);
  const [roomsInfo, setRoomsInfo] = useState([
    {
      adults: travelersIntermediate.adults,
      children: travelersIntermediate.children,
      childrenAges: [],
    },
  ]);
  const childrenAgeInfo = travelersIntermediate.childrenAges as number[];

  const handleSubmit = () => {
    setSubmitting(true);
    let childrenCount = 0;
    const roomsToSend = roomsInfo.map((r, i) => {
      let roomChildrenAges = [] as number[];
      if (r.children > 0) {
        roomChildrenAges = childrenAgeInfo.slice(childrenCount, r.children);
        childrenCount += r.children;
      }
      return { adults: r.adults, children: r.children, childrenAges: roomChildrenAges };
    });
    const travelersFinal = {
      adults: travelersIntermediate.adults,
      children: travelersIntermediate.children,
      childrenAges: travelersIntermediate.childrenAges,
      rooms: roomsToSend,
    };
    onNext({ travelers: travelersFinal });
  };

  const setRooms = (value: number) => {
    if (value < roomsInfo.length) {
      setRoomsInfo(roomsInfo.slice(0, value));
    } else if (value > roomsInfo.length) {
      setRoomsInfo([...roomsInfo, { adults: 1, children: 0, childrenAges: [] }]);
    }
  };

  const setRoomAdults = (value: number, index: number) => {
    const roomsInformation = roomsInfo.map((a, i) => {
      if (i === index) {
        return { adults: value, children: a.children, childrenAges: a.childrenAges };
      } else {
        return roomsInfo[i];
      }
    });

    setRoomsInfo(roomsInformation);
  };

  const setRoomChildren = (value: number, index: number) => {
    const roomsInformation = roomsInfo.map((a, i) => {
      if (i === index) {
        return { adults: a.adults, children: value, childrenAges: a.childrenAges };
      } else {
        return roomsInfo[i];
      }
    });

    setRoomsInfo(roomsInformation);
  };

  const validateRoomsInfo = () => {
    let totalAdults = 0,
      totalChildren = 0;
    roomsInfo.forEach((r, i) => {
      totalAdults += r.adults;
      totalChildren += r.children;
    });

    return (
      totalAdults !== travelersIntermediate.adults ||
      totalChildren !== travelersIntermediate.children
    );
  };

  return (
    <Grid gap={24}>
      <div>
        <Text heading size="xs" className="mt-md">
          Quantos quartos vocês vão precisar?
        </Text>
        <Text className="color-text-secondary mt-sm" size="md">
          Precisamos entender a organização de quartos para escolher a melhor hospedagem para vocês
        </Text>
      </div>
      <IncrementField
        className="slider--with-steps"
        name={`rooms`}
        formatter={formatToPlural("quarto", "quartos")}
        min={1}
        max={travelersIntermediate.adults}
        defaultValue={roomsInfo.length}
        onSelect={setRooms}
        step={1}
        disabled={submitting}
      />
      <Grid columns={{ sm: 1, md: [1, 3] }}>
        {roomsInfo.map((room, index) => {
          return (
            <>
              <Text size="md">Quarto {index + 1}</Text>
              <Grid columns={{ sm: 1, md: 2 }}>
                <IncrementField
                  className="slider--with-steps"
                  name={`room-${index}-adults`}
                  formatter={formatToPlural("adulto", "adultos")}
                  min={1}
                  max={travelersIntermediate.adults}
                  defaultValue={room.adults}
                  onSelect={(val) => setRoomAdults(val, index)}
                  step={1}
                  disabled={submitting}
                />
                <IncrementField
                  className="slider--with-steps"
                  name={`room-${index}-children`}
                  formatter={formatToPlural("criança", "crianças")}
                  min={0}
                  max={travelersIntermediate.children}
                  defaultValue={room.children}
                  onSelect={(val) => setRoomChildren(val, index)}
                  step={1}
                  disabled={submitting}
                />
              </Grid>
            </>
          );
        })}
      </Grid>

      <Grid gap={8} columns={[1, 3]} className="mt-md">
        <Button onClick={onPrevious} iconName="chevron-left" variant="neutral">
          Anterior
        </Button>

        <SubmitButton
          variant="tertiary"
          disabled={submitting || validateRoomsInfo()}
          submitting={submitting}
          onClick={handleSubmit}
        >
          Receber minha recomendação
        </SubmitButton>
      </Grid>
    </Grid>
  );
}
