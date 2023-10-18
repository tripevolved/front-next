import type { CardRestaurantProps } from "./card-restaurant.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Grid, Label, ToggleButton } from "mars-ds";
import { Box, Picture, Text } from "@/ui";
import { useState } from "react";

export function CardRestaurant({ restaurant, onClick, onChoose, onUnchoose, className, title, subtitle, header, href, image, sx, ...props }: CardRestaurantProps) {
  const cn = makeCn("card-restaurant", className)(sx);
  const [toggle, setToggle] = useState<boolean | null>(restaurant.isSelected ?? null);

  const handleToggle = (isThumbsUp: boolean) => {
    if (toggle === null && isThumbsUp || toggle === false && isThumbsUp) {
      setToggle(true);
      if (onChoose) { onChoose(restaurant.id) }
    } else if (toggle === true && isThumbsUp || toggle === false && !isThumbsUp) {
      setToggle(null);
      if (onUnchoose) { onUnchoose(restaurant.id) }
    } else if (toggle === null && !isThumbsUp || toggle === true && !isThumbsUp) {
      setToggle(false);
      if (onUnchoose) { onUnchoose(restaurant.id) }
    } else {
      setToggle(!toggle);
    }
  };

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
      <ToggleButton iconName="thumbs-up" variant={toggle === true ? "neutral" : "text"} size="sm" onClick={() => handleToggle(true)} />
      <ToggleButton iconName="thumbs-down" variant={toggle === false ? "neutral" : "text"} size="sm" onClick={() => handleToggle(false)} />
    </Grid>
  );
}
