import { Picture, Text } from "@/ui";
import { Grid } from "mars-ds";

export interface TripDetailInfoPros {
  title: string;
  text?: string;
  image: string;
  children?: React.ReactNode;
}

export const TripDetailInfo = ({ title, text, image, children }: TripDetailInfoPros) => (
  <Grid columns={["auto", "1fr"]}>
    <Picture src={image} height={40} width={40} />
    <div className="mt-sm">
      <Text as="h3" size="xl" className="color-primary">
        {title}
      </Text>
      {text ? <Text className="color-text-secondary">{text}</Text> : null}
      {children}
    </div>
  </Grid>
);
