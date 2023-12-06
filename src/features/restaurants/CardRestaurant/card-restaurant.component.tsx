import type { CardRestaurantProps } from "./card-restaurant.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Grid, Label, Modal, ToggleButton } from "mars-ds";
import { Box, Picture, Text } from "@/ui";
import { useState } from "react";
import { RestaurantChoiceType } from "@/core/types";
import { RestaurantDetailComponent } from "@/features";

export function CardRestaurant({ restaurant, onChoice, className, title, subtitle, header, href, image, sx, ...props }: CardRestaurantProps) {
  const cn = makeCn("card-restaurant", className)(sx);
  const [toggle, setToggle] = useState<boolean | null>(restaurant.isSelected === true ? true : null);

  const openDetailsModal = () => {
    const modal = Modal.open(
      () => (
        <>
          <RestaurantDetailComponent
            restaurantId={restaurant.id}
            onInclude={() => { handleToggle(true); modal.close(); }}
            onDiscard={() => { handleToggle(false); modal.close(); }}
          />
        </>
      ),
      {
        size: "md",
        closable: true,
      }
    );
  };

  const handleToggle = (isThumbsUp: boolean) => {
    let choiceType = "ignored" as RestaurantChoiceType;
    
    if (toggle === null && isThumbsUp || toggle === false && isThumbsUp) {
      setToggle(true);
      choiceType = "liked";
    } else if (toggle === true && isThumbsUp || toggle === false && !isThumbsUp) {
      setToggle(null);
      choiceType = "ignored";
    } else if (toggle === null && !isThumbsUp || toggle === true && !isThumbsUp) {
      setToggle(false);
      choiceType = "disliked";
    } else {
      setToggle(!toggle);
    }

    if (onChoice) {
      onChoice(restaurant.id, choiceType);
    }
  };

  return (
    <Grid className={cn} gap={6} columns={restaurant.imageUrl ? [2,8,1,1] : [10,1,1]}>
      {restaurant.imageUrl && (<Picture className="card-restaurant__icon" src={restaurant.imageUrl} />)}
      <Box className="card-restaurant__box" onClick={openDetailsModal} style={{cursor: "pointer"}} {...props}>
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
