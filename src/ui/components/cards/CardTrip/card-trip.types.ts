import type { ComponentHTMLProps } from "@/core/types";
import type { PictureProps } from "@/ui";
import { ReactNode } from "react";

export interface CardTripProps extends ComponentHTMLProps {
  header?: ReactNode;
  title?: string;
  subtitle?: string;
  href?: string;
  image?: string | PictureProps;
}
