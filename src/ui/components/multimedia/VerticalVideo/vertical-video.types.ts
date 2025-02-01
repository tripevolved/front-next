import { ComponentHTMLProps } from "@/core/types";
import { Asset } from "next-video/dist/assets.js";
import { RefObject } from "react";

export interface VerticalVideoProps extends ComponentHTMLProps {
  src?: Asset | string;
  className?: string;
  defaultOpen?: boolean;
  autoPlay?: boolean;
  children?: any;
}
