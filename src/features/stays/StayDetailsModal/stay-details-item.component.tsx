import { TripStayRoom } from "@/core/types";
import { Picture, Text } from "@/ui";
import { Card, Divider, Grid } from "mars-ds";
import { Checkbox } from "@/ui/components/forms/Checkbox";

interface StayDetailsItemProps {
  room: TripStayRoom;
  selected: boolean;
  setSelected: () => void;
}
export const StayDetailsItem = ({ room, selected, setSelected }: StayDetailsItemProps) => (
  <Card
    style={{
      border: `${selected ? "2px" : "1px"} solid var(${
        selected ? "--color-brand-1" : "--color-gray-3"
      })`,
      backgroundColor: "white",
    }}
    key={room.id}
  >
    <Grid columns={["100px", "auto", "auto"]}>
      <Picture src={room.coverImageUrl ?? "/assets/blank-image.png"} />
      <Text style={{ color: "var(--color-brand-2)" }}>{room.title} </Text>
      <Text
        size="md"
        style={{ fontWeight: "bold", marginTop: 0, color: "var(--color-brand-2)" }}
      >{`R$${(room.price / 1000).toFixed(3)}`}</Text>
    </Grid>
    <Divider
      style={{
        backgroundColor: `var(${selected ? "--color-brand-1" : "--color-gray-3"})`,
        borderWidth: 2,
      }}
    />
    <div className="flex-column pt-sm" style={{ alignItems: "center" }}>
      <Checkbox
        checked={selected}
        checkedColor="var(--color-brand-1)"
        label={selected ? "Selecionado" : "Selecionar este"}
        key={room.id}
        onClick={setSelected}
      />
    </div>
  </Card>
);
