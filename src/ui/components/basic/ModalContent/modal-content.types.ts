import type { PictureProps, TextProps } from "@/ui";
import { ComponentHTMLProps } from "@/core/types";
import { ContainerProps } from "mars-ds";

interface ModalContentProps extends ComponentHTMLProps {
  image?: PictureProps;
  heading?: string | TextProps;
  text?: string | TextProps;
  container?: ContainerProps["container"];
}

export type { ModalContentProps };
