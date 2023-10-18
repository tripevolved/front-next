import type { CardRestaurantProps } from "./card-restaurant.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Grid, Label, ToggleButton } from "mars-ds";
import { Box, Picture, Text } from "@/ui";

export function CardRestaurant({ restaurant, onClick, onChoose, onUnchoose, className, title, subtitle, header, href, image, sx, ...props }: CardRestaurantProps) {
  const cn = makeCn("card-restaurant", className)(sx);

  return (
    <Grid className={cn} gap={6} columns={restaurant.imageUrl ? [2,8,1,1] : [10,1,1]} onClick={onClick} style={{cursor: "pointer"}} {...props}>
      {restaurant.imageUrl && (<Picture className="card-restaurant__icon" src={restaurant.imageUrl} />)}
      <Box className="card-restaurant__box">
        <Text size="md" className="card-restaurant__title">
          {restaurant.name}
        </Text>
        {restaurant.isSelected && <Label>Já presente no seu roteiro</Label>}
        <Text size="sm" className="card-restaurant__subtitle">
          {`${restaurant.tags}${restaurant.priceRange && ` - ${restaurant.priceRange}`}`}
        </Text>
      </Box>
      <ToggleButton iconName="thumbs-up" variant="text" size="sm" onClick={() => onChoose(restaurant.id)} />
      <ToggleButton iconName="thumbs-down" variant="text" size="sm" onClick={() => onUnchoose(restaurant.id)} />
    </Grid>
  );
}
