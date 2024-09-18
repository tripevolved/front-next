import { Text } from "@/ui";
import { Grid } from "mars-ds";

export interface TripDetailInfoPros {
  title: string;
  children?: React.ReactNode;
}

export const TripDetailInfo = ({ title, children }: TripDetailInfoPros) => {
  return (
    <Grid columns={["auto", "1fr"]} style={{ alignItems: "center" }}>
      <div style={{ backgroundColor: "#0ab9ad", width: 20, height: 20, borderRadius: "50%" }} />
      <div className="mt-sm" style={{ display: "flex", flexDirection: "column" }}>
        <Text as="h3" size="xl" className="color-primary">
          {title}
        </Text>
        {children}
      </div>
    </Grid>
  );
};
