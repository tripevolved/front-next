import type { ComponentHTMLProps, Restaurant, RestaurantChoiceType } from "@/core/types";
import type { PictureProps } from "@/ui";
import { ReactNode } from "react";

export interface CardRestaurantProps extends ComponentHTMLProps {
  restaurant: Restaurant;
  onClick?: () => void;
  onChoice?: (restaurantId: string, type: RestaurantChoiceType) => void;
  header?: ReactNode;
  title?: string;
  subtitle?: string;
  href?: string;
  image?: string | PictureProps;
}
