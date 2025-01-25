import { ComponentHTMLProps } from "@/core/types";
import { Asset } from "next-video/dist/assets.js";

export interface VerticalVideoProps extends ComponentHTMLProps {
  src?: Asset | string;
  className?: string;
  defaultOpen?: boolean;
  children?: any;
}
