import type { ComponentHTMLProps, Restaurant } from "@/core/types";
import type { PictureProps } from "@/ui";
import { ReactNode } from "react";

export interface CardRestaurantProps extends ComponentHTMLProps {
  restaurant: Restaurant;
  onClick?: () => void;
  onChoose?: (restaurantId: string) => void;
  onUnchoose?: (restaurantId: string) => void;
  header?: ReactNode;
  title?: string;
  subtitle?: string;
  href?: string;
  image?: string | PictureProps;
}
